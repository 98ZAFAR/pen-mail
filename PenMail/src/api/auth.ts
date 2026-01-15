/**
 * Authentication API Service
 * 
 * This file contains all authentication-related API calls.
 * Uncomment and customize the functions as needed.
 */

import { apiFetch } from './config';
import type { User, ApiResponse } from '../types';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  fullName: string;
  nickName: string;
  email: string;
  password: string;
  countryCode: string;
}

interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export const authApi = {
  /**
   * Login user
   */
  login: async (credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    return apiFetch<ApiResponse<AuthResponse>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  /**
   * Register new user
   */
  register: async (userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
    return apiFetch<ApiResponse<AuthResponse>>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  /**
   * Logout user
   */
  logout: async (token: string): Promise<ApiResponse<void>> => {
    return apiFetch<ApiResponse<void>>('/auth/logout', {
      method: 'POST',
    }, token);
  },

  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken: string): Promise<ApiResponse<{ token: string }>> => {
    return apiFetch<ApiResponse<{ token: string }>>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },

  /**
   * Request password reset
   */
  forgotPassword: async (email: string): Promise<ApiResponse<void>> => {
    return apiFetch<ApiResponse<void>>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  /**
   * Reset password with token
   */
  resetPassword: async (token: string, newPassword: string): Promise<ApiResponse<void>> => {
    return apiFetch<ApiResponse<void>>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    });
  },
};

export default authApi;
