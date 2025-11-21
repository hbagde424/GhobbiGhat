import express from 'express';
import { authenticate } from '../middleware/auth';
import { createPaymentOrder, verifyPayment } from '../controllers/payment.controller';

const router = express.Router();

router.use(authenticate);

router.post('/create-order', createPaymentOrder);
router.post('/verify', verifyPayment);

export default router;
