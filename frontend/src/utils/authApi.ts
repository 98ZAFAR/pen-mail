import { apiPost } from './api';
import { LoginPayload, RegisterPayload, AuthResponse } from '@/types';

/**
 * Register a new user
 */
export async function registerUser(data: RegisterPayload) {
  return apiPost<AuthResponse>('/auth/register', data);
}

/**
 * Login user
 */
export async function loginUser(data: LoginPayload) {
  return apiPost<AuthResponse>('/auth/login', data);
}

/**
 * Logout user
 */
export async function logoutUser() {
  return apiPost('/auth/logout');
}

/**
 * Request password reset
 */
export async function forgotPassword(email: string) {
  return apiPost('/auth/forgot-password', { email });
}

/**
 * Reset password with token
 */
export async function resetPassword(token: string, password: string) {
  return apiPost(`/auth/reset-password/${token}`, { password });
}
