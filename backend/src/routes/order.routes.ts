import express from 'express';
import {
  createOrder,
  getUserOrders,
  getVendorOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  addOrderItems,
  uploadPickupPhotos,
  uploadDeliveryPhotos,
} from '../controllers/order.controller';
import { authenticate, authorize } from '../middleware/auth';
import { orderValidation } from '../middleware/validation';
import { uploadPickupPhotos as uploadPickupMiddleware, uploadDeliveryPhotos as uploadDeliveryMiddleware } from '../middleware/upload';

const router = express.Router();

// User routes
router.post('/', authenticate, authorize('user'), orderValidation, createOrder);
router.get('/my-orders', authenticate, authorize('user'), getUserOrders);
router.get('/:orderId', authenticate, getOrderById);
router.put('/:orderId/cancel', authenticate, authorize('user'), cancelOrder);

// Vendor routes
router.get('/vendor/orders', authenticate, authorize('vendor'), getVendorOrders);
router.put('/:orderId/status', authenticate, authorize('vendor'), updateOrderStatus);
router.put('/:orderId/items', authenticate, authorize('vendor'), addOrderItems);

// Photo upload routes (Vendor only)
router.post('/:orderId/pickup-photos', authenticate, authorize('vendor'), uploadPickupMiddleware, uploadPickupPhotos);
router.post('/:orderId/delivery-photos', authenticate, authorize('vendor'), uploadDeliveryMiddleware, uploadDeliveryPhotos);

export default router;

