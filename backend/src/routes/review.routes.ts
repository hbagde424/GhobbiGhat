import express from 'express';
import {
  createReview,
  getVendorReviews,
  respondToReview,
  flagReview,
} from '../controllers/review.controller';
import { authenticate, authorize } from '../middleware/auth';
import { reviewValidation } from '../middleware/validation';

const router = express.Router();

// User routes
router.post('/', authenticate, authorize('user'), reviewValidation, createReview);

// Public routes
router.get('/vendor/:vendorId', getVendorReviews);

// Vendor routes
router.post('/:reviewId/respond', authenticate, authorize('vendor'), respondToReview);

// Admin routes
router.put('/:reviewId/flag', authenticate, authorize('admin', 'superadmin'), flagReview);

export default router;
