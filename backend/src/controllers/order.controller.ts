import { Response, NextFunction } from 'express';
import Order from '../models/Order';
import Vendor from '../models/Vendor';
import Service from '../models/Service';
import { AuthRequest } from '../middleware/auth';
import { NotFoundError, ValidationError, AuthorizationError } from '../utils/errors';
import { createNotification } from '../services/notification.service';
import { sendOrderNotification } from '../services/email.service';
import { config } from '../config';

// Create Order
export const createOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user.id;
    const { vendorId, serviceType, pickupAddress, deliveryAddress, pickupDate, pickupTimeSlot, specialInstructions } = req.body;

    // Validate vendor
    const vendor = await Vendor.findById(vendorId);
    if (!vendor || !vendor.isApproved || !vendor.isActive) {
      throw new NotFoundError('Vendor not found or not available');
    }

    // Validate service
    const service = await Service.findById(serviceType);
    if (!service || !service.isActive) {
      throw new NotFoundError('Service not found');
    }

    // Calculate pricing (basic calculation, can be enhanced)
    const subtotal = service.basePrice;
    const tax = subtotal * 0.18; // 18% GST
    const deliveryCharge = 0; // Free delivery
    const discount = 0;
    const totalAmount = subtotal + tax + deliveryCharge - discount;

    // Calculate commission
    const commissionRate = vendor.commissionRate || config.defaultCommissionRate;
    const commissionAmount = (subtotal * commissionRate) / 100;
    const vendorEarning = subtotal - commissionAmount;

    // Generate unique order number
    const orderCount = await Order.countDocuments();
    const orderNumber = `DG${Date.now()}${orderCount + 1}`;

    const orderData = {
      orderNumber,  // Explicitly set order number
      userId,
      vendorId,
      serviceType,
      pickupAddress,
      deliveryAddress: deliveryAddress || pickupAddress,
      pickupDate: new Date(pickupDate),
      pickupTimeSlot,
      specialInstructions,
      items: [], // Will be filled by vendor after pickup
      subtotal,
      tax,
      deliveryCharge,
      discount,
      totalAmount,
      paymentMethod: req.body.paymentMethod || 'cod',
      commissionRate,
      commissionAmount,
      vendorEarning,
      statusHistory: [{
        status: 'pending',
        timestamp: new Date(),
        notes: 'Order placed',
      }],
    };

    const order = await Order.create(orderData);

    // Update vendor stats
    vendor.totalOrders += 1;
    await vendor.save();

    // Create notification for vendor
    await createNotification({
      userId: vendor.userId,
      type: 'order_update',
      title: 'New Order Received',
      message: `You have a new order ${order.orderNumber}`,
      data: { orderId: order._id },
      link: `/vendor/orders/${order._id}`,
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

// Get User Orders
export const getUserOrders = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const query: any = { userId: req.user.id };
    if (status) query.status = status;

    const skip = (Number(page) - 1) * Number(limit);

    const orders = await Order.find(query)
      .populate('vendorId', 'businessName rating')
      .populate('serviceType', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get Vendor Orders
export const getVendorOrders = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.id });
    if (!vendor) {
      throw new NotFoundError('Vendor profile not found');
    }

    const { page = 1, limit = 10, status } = req.query;

    const query: any = { vendorId: vendor._id };
    if (status) query.status = status;

    const skip = (Number(page) - 1) * Number(limit);

    const orders = await Order.find(query)
      .populate('userId', 'name phone email')
      .populate('serviceType', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get Order by ID
export const getOrderById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate('userId', 'name phone email')
      .populate('vendorId')
      .populate('serviceType');

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    // Check authorization
    const vendor = await Vendor.findOne({ userId: req.user.id });
    const isOwner = order.userId.toString() === req.user.id;
    const isVendor =
      vendor && String((order.vendorId as any)?._id) === String((vendor as any)?._id);
    const isAdmin = ['admin', 'superadmin'].includes(req.user.role);

    if (!isOwner && !isVendor && !isAdmin) {
      throw new AuthorizationError('Not authorized to view this order');
    }

    res.json({
      success: true,
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

// Update Order Status (Vendor)
export const updateOrderStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const { status, notes } = req.body;

    const vendor = await Vendor.findOne({ userId: req.user.id });
    if (!vendor) {
      throw new NotFoundError('Vendor profile not found');
    }

    const order = await Order.findOne({
      _id: orderId,
      vendorId: vendor._id,
    }).populate('userId');

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    // Validate status transition
    const validStatuses = ['pending', 'accepted', 'picked_up', 'in_progress', 'ready', 'out_for_delivery', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new ValidationError('Invalid status');
    }

    order.status = status;
    order.statusHistory.push({
      status,
      timestamp: new Date(),
      notes,
    });

    // Update delivery date when delivered
    if (status === 'delivered') {
      order.deliveryDate = new Date();
      vendor.completedOrders += 1;
      vendor.pendingEarnings += order.vendorEarning;
    }

    await order.save();
    await vendor.save();

    // Send notification to user
    const user = order.userId as any;
    await createNotification({
      userId: user._id,
      type: 'order_update',
      title: 'Order Status Updated',
      message: `Your order ${order.orderNumber} is now ${status}`,
      data: { orderId: order._id },
      link: `/orders/${order._id}`,
    });

    await sendOrderNotification(user.email, order.orderNumber, status);

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

// Cancel Order
export const cancelOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const { reason } = req.body;

    const order = await Order.findOne({
      _id: orderId,
      userId: req.user.id,
    });

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    // Can only cancel pending or accepted orders
    if (!['pending', 'accepted'].includes(order.status)) {
      throw new ValidationError('Order cannot be cancelled at this stage');
    }

    order.status = 'cancelled';
    order.cancellationReason = reason;
    order.cancelledBy = 'user';
    order.cancelledAt = new Date();
    order.statusHistory.push({
      status: 'cancelled',
      timestamp: new Date(),
      notes: reason,
    });

    await order.save();

    // Update vendor stats
    await Vendor.findByIdAndUpdate(order.vendorId, {
      $inc: { cancelledOrders: 1 },
    });

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

// Add Items to Order (Vendor - after pickup)
export const addOrderItems = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const { items } = req.body;

    const vendor = await Vendor.findOne({ userId: req.user.id });
    if (!vendor) {
      throw new NotFoundError('Vendor profile not found');
    }

    const order = await Order.findOne({
      _id: orderId,
      vendorId: vendor._id,
    });

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    order.items = items;

    // Recalculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + item.totalPrice, 0);
    const tax = subtotal * 0.18;
    const totalAmount = subtotal + tax + order.deliveryCharge - order.discount;
    const commissionAmount = (subtotal * order.commissionRate) / 100;
    const vendorEarning = subtotal - commissionAmount;

    order.subtotal = subtotal;
    order.tax = tax;
    order.totalAmount = totalAmount;
    order.commissionAmount = commissionAmount;
    order.vendorEarning = vendorEarning;

    await order.save();

    res.json({
      success: true,
      message: 'Order items added successfully',
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};
