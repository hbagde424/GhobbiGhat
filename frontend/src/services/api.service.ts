import apiClient from '../lib/api-client';

export const serviceAPI = {
  getAll: async (params?: { category?: string; isActive?: boolean }) => {
    return await apiClient.get('/services', { params });
  },

  getById: async (serviceId: string) => {
    return await apiClient.get(`/services/${serviceId}`);
  },
};

export const reviewAPI = {
  create: async (data: {
    orderId: string;
    rating: number;
    comment: string;
    photos?: string[];
  }) => {
    return await apiClient.post('/reviews', data);
  },

  getVendorReviews: async (vendorId: string, params?: { page?: number; limit?: number }) => {
    return await apiClient.get(`/reviews/vendor/${vendorId}`, { params });
  },

  respond: async (reviewId: string, message: string) => {
    return await apiClient.post(`/reviews/${reviewId}/respond`, { message });
  },
};

export const userAPI = {
  getProfile: async () => {
    return await apiClient.get('/users/profile');
  },

  updateProfile: async (data: { name?: string; phone?: string }) => {
    return await apiClient.put('/users/profile', data);
  },

  getAddresses: async () => {
    return await apiClient.get('/users/addresses');
  },

  addAddress: async (data: any) => {
    return await apiClient.post('/users/addresses', data);
  },

  updateAddress: async (addressId: string, data: any) => {
    return await apiClient.put(`/users/addresses/${addressId}`, data);
  },

  deleteAddress: async (addressId: string) => {
    return await apiClient.delete(`/users/addresses/${addressId}`);
  },
};

// Compatibility export: combined apiService for older imports
export const apiService = {
  ...serviceAPI,
  ...reviewAPI,
  ...userAPI,
};
// (single combined export above)
