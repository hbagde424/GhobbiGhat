import { Response, NextFunction } from 'express';
import User from '../models/User';
import Vendor from '../models/Vendor';
import Order from '../models/Order';
import Payout from '../models/Payout';
import Settings from '../models/Settings';
import { AuthRequest } from '../middleware/auth';
import { NotFoundError } from '../utils/errors';

// Get Dashboard Stats
export const getDashboardStats = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalVendors = await Vendor.countDocuments();
    const activeVendors = await Vendor.countDocuments({ isActive: true, isApproved: true });
    const pendingVendors = await Vendor.countDocuments({ verificationStatus: 'pending' });
    
    const totalOrders = await Order.countDocuments();
    const completedOrders = await Order.countDocuments({ status: 'delivered' });
    const activeOrders = await Order.countDocuments({
      status: { $nin: ['delivered', 'cancelled'] },
    });

    // Revenue calculation
    const revenueData = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
          totalCommission: { $sum: '$commissionAmount' },
        },
      },
    ]);

    const revenue = revenueData[0] || { totalRevenue: 0, totalCommission: 0 };

    res.json({
      success: true,
      data: {
        users: { total: totalUsers },
        vendors: {
          total: totalVendors,
          active: activeVendors,
          pending: pendingVendors,
        },
        orders: {
          total: totalOrders,
          completed: completedOrders,
          active: activeOrders,
        },
        revenue: {
          total: revenue.totalRevenue,
          commission: revenue.totalCommission,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get All Users
export const getAllUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { page = 1, limit = 20, search, role } = req.query;

    const query: any = {};
    if (search) {
      query.$or = [
        { name: new RegExp(search as string, 'i') },
        { email: new RegExp(search as string, 'i') },
        { phone: new RegExp(search as string, 'i') },
      ];
    }
    if (role) query.role = role;

    const skip = (Number(page) - 1) * Number(limit);

    const users = await User.find(query)
      .select('-password -refreshToken')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: {
        users,
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

// Get All Vendors
export const getAllVendors = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { page = 1, limit = 20, status, city } = req.query;

    const query: any = {};
    if (status) query.verificationStatus = status;
    if (city) query.city = new RegExp(city as string, 'i');

    const skip = (Number(page) - 1) * Number(limit);

    const vendors = await Vendor.find(query)
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Vendor.countDocuments(query);

    res.json({
      success: true,
      data: {
        vendors,
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

// Approve Vendor
export const approveVendor = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { vendorId } = req.params;

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      throw new NotFoundError('Vendor not found');
    }

    vendor.verificationStatus = 'approved';
    vendor.isApproved = true;
    vendor.isVerified = true;
    await vendor.save();

    res.json({
      success: true,
      message: 'Vendor approved successfully',
      data: { vendor },
    });
  } catch (error) {
    next(error);
  }
};

// Reject Vendor
export const rejectVendor = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { vendorId } = req.params;
    const { reason } = req.body;

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      throw new NotFoundError('Vendor not found');
    }

    vendor.verificationStatus = 'rejected';
    vendor.isApproved = false;
    vendor.rejectionReason = reason;
    await vendor.save();

    res.json({
      success: true,
      message: 'Vendor rejected',
      data: { vendor },
    });
  } catch (error) {
    next(error);
  }
};

// Toggle User Status
export const toggleUserStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

// Get All Orders (Admin)
export const getAllOrders = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { page = 1, limit = 20, status } = req.query;

    const query: any = {};
    if (status) query.status = status;

    const skip = (Number(page) - 1) * Number(limit);

    const orders = await Order.find(query)
      .populate('userId', 'name email phone')
      .populate('vendorId', 'businessName')
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

// Update Commission Rate
export const updateCommissionRate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { vendorId } = req.params;
    const { commissionRate } = req.body;

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      throw new NotFoundError('Vendor not found');
    }

    vendor.commissionRate = commissionRate;
    await vendor.save();

    res.json({
      success: true,
      message: 'Commission rate updated successfully',
      data: { vendor },
    });
  } catch (error) {
    next(error);
  }
};

// Create Payout
export const createPayout = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { vendorId, amount, orders, notes } = req.body;

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      throw new NotFoundError('Vendor not found');
    }

    const payout = await Payout.create({
      vendorId,
      amount,
      orders,
      notes,
      processedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Payout created successfully',
      data: { payout },
    });
  } catch (error) {
    next(error);
  }
};

// Get Settings
export const getSettings = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const settings = await Settings.find();

    const settingsObj: any = {};
    settings.forEach((setting) => {
      settingsObj[setting.key] = setting.value;
    });

    res.json({
      success: true,
      data: { settings: settingsObj },
    });
  } catch (error) {
    next(error);
  }
};

// Update Settings
export const updateSettings = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { key, value, type, description } = req.body;

    const setting = await Settings.findOneAndUpdate(
      { key },
      { value, type, description, updatedBy: req.user.id },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: 'Setting updated successfully',
      data: { setting },
    });
  } catch (error) {
    next(error);
  }
};
