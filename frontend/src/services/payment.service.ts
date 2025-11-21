import apiClient from '../lib/api-client';

export const paymentAPI = {
    createOrder: async (orderId: string) => {
        return await apiClient.post('/payments/create-order', { orderId });
    },

    verifyPayment: async (data: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
        orderId: string;
    }) => {
        return await apiClient.post('/payments/verify', data);
    },
};
