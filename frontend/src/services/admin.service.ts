import apiClient from '@/lib/api-client';

export interface AdminStats {
  totalUsers: number;
  totalVendors: number;
  totalOrders: number;
  totalRevenue: number;
  pendingVendors: number;
  activeOrders: number;
}

export const adminAPI = {
  // Dashboard Stats
  async getDashboardStats(): Promise<{ stats: AdminStats }> {
    const response = await apiClient.get('/admin/dashboard/stats');
    return response.data;
  },

  // User Management
  async getAllUsers(params?: { page?: number; limit?: number; search?: string }) {
    const response = await apiClient.get('/admin/users', { params });
    return response.data;
  },

  async toggleUserStatus(userId: string, isActive: boolean) {
    const response = await apiClient.put(`/admin/users/${userId}/status`, { isActive });
    return response.data;
  },

  // Vendor Management
  async getAllVendors(params?: { page?: number; limit?: number; status?: string }) {
    const response = await apiClient.get('/admin/vendors', { params });
    return response.data;
  },

  async approveVendor(vendorId: string) {
    const response = await apiClient.put(`/admin/vendors/${vendorId}/approve`);
    return response.data;
  },

  async rejectVendor(vendorId: string, reason: string) {
    const response = await apiClient.put(`/admin/vendors/${vendorId}/reject`, { reason });
    return response.data;
  },

  // Order Management
  async getAllOrders(params?: { page?: number; limit?: number; status?: string }) {
    const response = await apiClient.get('/admin/orders', { params });
    return response.data;
  },

  // Settings
  async getSettings() {
    const response = await apiClient.get('/admin/settings');
    return response.data;
  },

  async updateSettings(settings: any) {
    const response = await apiClient.put('/admin/settings', settings);
    return response.data;
  },

  async updateCommissionRate(rate: number) {
    const response = await apiClient.put('/admin/settings/commission', { commissionRate: rate });
    return response.data;
  },

  // Payouts
  async createPayout(vendorId: string, amount: number) {
    const response = await apiClient.post('/admin/payouts', { vendorId, amount });
    return response.data;
  },

  async getPayouts(params?: { page?: number; limit?: number }) {
    const response = await apiClient.get('/admin/payouts', { params });
    return response.data;
  },
};
