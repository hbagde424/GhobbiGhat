import express from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/service.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getAllServices);
router.get('/:serviceId', getServiceById);

// Admin routes
router.post('/', authenticate, authorize('admin', 'superadmin'), createService);
router.put('/:serviceId', authenticate, authorize('admin', 'superadmin'), updateService);
router.delete('/:serviceId', authenticate, authorize('admin', 'superadmin'), deleteService);

export default router;
