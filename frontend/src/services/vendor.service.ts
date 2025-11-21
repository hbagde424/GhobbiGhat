import apiClient from '../lib/api-client';

export interface Vendor {
  _id: string;
  businessName: string;
  ownerName: string;
  businessPhone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  serviceAreas: string[];
  description?: string;
  rating: number;
  totalReviews: number;
  totalOrders: number;
  services: any[];
  gallery: string[];
  businessHours: any[];
}

export interface VendorSearchParams {
  pincode?: string;
  city?: string;
  page?: number;
  limit?: number;
}

export const vendorAPI = {
  search: async (params: VendorSearchParams) => {
    return await apiClient.get('/vendors/search', { params });
  },

  getById: async (vendorId: string) => {
    return await apiClient.get(`/vendors/${vendorId}`);
  },

  register: async (formData: FormData) => {
    return await apiClient.post('/vendors/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getProfile: async () => {
    return await apiClient.get('/vendors/profile/me');
  },

  updateProfile: async (data: any) => {
    return await apiClient.put('/vendors/profile/me', data);
  },

  updateBankDetails: async (data: any) => {
    return await apiClient.put('/vendors/bank-details', data);
  },

  getDashboard: async () => {
    return await apiClient.get('/vendors/dashboard/stats');
  },
};
