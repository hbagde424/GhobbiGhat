import apiClient from '../lib/api-client';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
}
export interface RegisterDataExtended extends RegisterData {
  role?: 'user' | 'vendor';
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  businessName?: string;
  businessPhone?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      phone: string;
      role: string;
      isEmailVerified: boolean;
      avatar?: string;
    };
    token: string;
    refreshToken: string;
  };
}

export const authAPI = {
  register: async (data: RegisterDataExtended): Promise<AuthResponse> => {
    return await apiClient.post('/auth/register', data);
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    return await apiClient.post('/auth/login', data);
  },

  getMe: async () => {
    return await apiClient.get('/auth/me');
  },

  logout: async () => {
    return await apiClient.post('/auth/logout');
  },

  verifyEmail: async (token: string) => {
    return await apiClient.post('/auth/verify-email', { token });
  },

  forgotPassword: async (email: string) => {
    return await apiClient.post('/auth/forgot-password', { email });
  },

  resetPassword: async (token: string, password: string) => {
    return await apiClient.post('/auth/reset-password', { token, password });
  },
};
