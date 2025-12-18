import { apiGet } from './api';
import { User } from '@/types';

/**
 * Get welcome message (public)
 */
export async function getWelcome() {
  return apiGet<{ message: string }>('/');
}

/**
 * Get all users (public endpoint)
 */
export async function getAllUsersPublic() {
  return apiGet<User[]>('/users');
}

/**
 * Get user profile by ID (public endpoint)
 */
export async function getUserProfilePublic(userId: string) {
  return apiGet<User>(`/users/${userId}`);
}
