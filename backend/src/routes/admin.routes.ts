import express from 'express';
import {
  getDashboardStats,
  getAllUsers,
  getAllVendors,
  approveVendor,
  rejectVendor,
  toggleUserStatus,
  getAllOrders,
  updateCommissionRate,
  createPayout,
  getSettings,
  updateSettings,
} from '../controllers/admin.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// All admin routes require authentication and admin/superadmin role
router.use(authenticate);
router.use(authorize('admin', 'superadmin'));

// Dashboard
router.get('/dashboard/stats', getDashboardStats);

// Users Management
router.get('/users', getAllUsers);
router.put('/users/:userId/toggle-status', toggleUserStatus);

// Vendors Management
router.get('/vendors', getAllVendors);
router.put('/vendors/:vendorId/approve', approveVendor);
router.put('/vendors/:vendorId/reject', rejectVendor);
router.put('/vendors/:vendorId/commission', updateCommissionRate);

// Orders Management
router.get('/orders', getAllOrders);

// Payouts
router.post('/payouts', createPayout);

// Settings (Superadmin only)
router.get('/settings', authorize('superadmin'), getSettings);
router.put('/settings', authorize('superadmin'), updateSettings);

export default router;
