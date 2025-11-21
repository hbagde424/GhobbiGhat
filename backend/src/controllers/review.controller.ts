import { Response, NextFunction } from 'express';
import Review from '../models/Review';
import Order from '../models/Order';
import { AuthRequest } from '../middleware/auth';
import { NotFoundError, ValidationError } from '../utils/errors';

// Create Review
export const createReview = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { orderId, rating, comment, photos } = req.body;

    // Check if order exists and belongs to user
    const order = await Order.findOne({
      _id: orderId,
      userId: req.user.id,
      status: 'delivered',
    });

    if (!order) {
      throw new NotFoundError('Order not found or not completed');
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ orderId });
    if (existingReview) {
      throw new ValidationError('Review already exists for this order');
    }

    const review = await Review.create({
      orderId,
      userId: req.user.id,
      vendorId: order.vendorId,
      rating,
      comment,
      photos,
    });

    // Update order with review
    order.rating = rating;
    order.review = comment;
    order.reviewDate = new Date();
    await order.save();

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: { review },
    });
  } catch (error) {
    next(error);
  }
};

// Get Vendor Reviews
export const getVendorReviews = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { vendorId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const reviews = await Review.find({
      vendorId,
      isApproved: true,
    })
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Review.countDocuments({
      vendorId,
      isApproved: true,
    });

    res.json({
      success: true,
      data: {
        reviews,
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

// Vendor Response to Review
export const respondToReview = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { reviewId } = req.params;
    const { message } = req.body;

    const review = await Review.findById(reviewId);

    if (!review) {
      throw new NotFoundError('Review not found');
    }

    review.response = {
      message,
      respondedAt: new Date(),
    };

    await review.save();

    res.json({
      success: true,
      message: 'Response added successfully',
      data: { review },
    });
  } catch (error) {
    next(error);
  }
};

// Flag Review (Admin)
export const flagReview = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { reviewId } = req.params;
    const { reason } = req.body;

    const review = await Review.findById(reviewId);

    if (!review) {
      throw new NotFoundError('Review not found');
    }

    review.isFlagged = true;
    review.flagReason = reason;
    review.isApproved = false;

    await review.save();

    res.json({
      success: true,
      message: 'Review flagged successfully',
      data: { review },
    });
  } catch (error) {
    next(error);
  }
};
