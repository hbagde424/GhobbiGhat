import { Response, NextFunction } from 'express';
import crypto from 'crypto';
import { AuthRequest } from '../middleware/auth';
import { razorpay } from '../utils/payment';
import { config } from '../config';
import Order from '../models/Order';
import { NotFoundError, ValidationError } from '../utils/errors';

// Create Payment Order
export const createPaymentOrder = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { orderId } = req.body;

        const order = await Order.findOne({
            _id: orderId,
            userId: req.user.id,
        });

        if (!order) {
            throw new NotFoundError('Order not found');
        }

        const options = {
            amount: Math.round(order.totalAmount * 100), // amount in smallest currency unit
            currency: 'INR',
            receipt: `order_${orderId}`,
            payment_capture: 1,
        };

        const response = await razorpay.orders.create(options);

        // Store razorpay order ID in the order
        order.razorpayOrderId = response.id;
        await order.save();

        res.json({
            success: true,
            data: {
                id: response.id,
                currency: response.currency,
                amount: response.amount,
                orderId: order._id,
                key: config.razorpay.keyId,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Verify Payment
export const verifyPayment = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

        const body = razorpay_order_id + '|' + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', config.razorpay.keySecret!)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            const order = await Order.findById(orderId);
            if (!order) {
                throw new NotFoundError('Order not found');
            }

            // Update order with payment details
            order.paymentStatus = 'paid';
            order.razorpayPaymentId = razorpay_payment_id;
            order.razorpaySignature = razorpay_signature;
            await order.save();

            res.json({
                success: true,
                message: 'Payment verified successfully',
            });
        } else {
            throw new ValidationError('Invalid payment signature');
        }
    } catch (error) {
        next(error);
    }
};
