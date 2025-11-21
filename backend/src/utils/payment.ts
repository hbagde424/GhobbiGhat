import Razorpay from 'razorpay';
import { config } from '../config';

if (!config.razorpay.keyId || !config.razorpay.keySecret) {
  console.warn('Razorpay keys are missing in configuration');
}

export const razorpay = new Razorpay({
  key_id: config.razorpay.keyId || 'test_key_id',
  key_secret: config.razorpay.keySecret || 'test_key_secret',
});
