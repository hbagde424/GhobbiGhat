import apiClient from '../lib/api-client';

export interface CreateOrderData {
  vendorId: string;
  serviceType: string;
  pickupAddress: any;
  deliveryAddress?: any;
  pickupDate: string;
  pickupTimeSlot: string;
  specialInstructions?: string;
  paymentMethod: 'online' | 'cod';
}

export interface Order {
  _id: string;
  orderNumber: string;
  userId: string;
  vendorId: any;
  serviceType: any;
  status: string;
  pickupAddress: any;
  deliveryAddress: any;
  pickupDate: string;
  pickupTimeSlot: string;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  items: any[];
  createdAt: string;
  updatedAt: string;
}

export const orderAPI = {
  create: async (data: CreateOrderData) => {
    return await apiClient.post('/orders', data);
  },

  getMyOrders: async (params?: { page?: number; limit?: number; status?: string }) => {
    return await apiClient.get('/orders/my-orders', { params });
  },

  getById: async (orderId: string) => {
    return await apiClient.get(`/orders/${orderId}`);
  },

  cancel: async (orderId: string, reason: string) => {
    return await apiClient.put(`/orders/${orderId}/cancel`, { reason });
  },

  // Vendor endpoints
  getVendorOrders: async (params?: { page?: number; limit?: number; status?: string }) => {
    return await apiClient.get('/orders/vendor/orders', { params });
  },

  updateStatus: async (orderId: string, status: string, notes?: string) => {
    return await apiClient.put(`/orders/${orderId}/status`, { status, notes });
  },

  // Alias used by some components
  updateOrderStatus: async (orderId: string, status: string, notes?: string) => {
    return await apiClient.put(`/orders/${orderId}/status`, { status, notes });
  },

  addItems: async (orderId: string, items: any[]) => {
    return await apiClient.put(`/orders/${orderId}/items`, { items });
  },

  uploadPickupPhotos: async (orderId: string, formData: FormData) => {
    return await apiClient.post(`/orders/${orderId}/pickup-photos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  uploadDeliveryPhotos: async (orderId: string, formData: FormData) => {
    return await apiClient.post(`/orders/${orderId}/delivery-photos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
