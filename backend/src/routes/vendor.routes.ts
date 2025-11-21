import express from 'express';
import {
  registerVendor,
  getVendorProfile,
  updateVendorProfile,
  searchVendors,
  getVendorById,
  updateBankDetails,
  getVendorDashboard,
  seedVendors,
} from '../controllers/vendor.controller';
import { authenticate, authorize } from '../middleware/auth';
import { upload } from '../services/upload.service';

const router = express.Router();

// Public routes
router.get('/search', searchVendors);
router.get('/seed', seedVendors); // Dev helper: create sample approved vendors
router.get('/:vendorId', getVendorById);

// Vendor routes (requires authentication)
router.post(
  '/register',
  authenticate,
  upload.array('documents', 5),
  registerVendor
);
router.get('/profile/me', authenticate, authorize('vendor'), getVendorProfile);
router.put('/profile/me', authenticate, authorize('vendor'), updateVendorProfile);
router.put('/bank-details', authenticate, authorize('vendor'), updateBankDetails);
router.get('/dashboard/stats', authenticate, authorize('vendor'), getVendorDashboard);

export default router;
