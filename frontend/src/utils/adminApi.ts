import { apiGet, apiPost, apiPut, apiDelete, apiPostFormData, apiPutFormData } from './api';
import { User, Stamp } from '@/types';

/**
 * Admin Stamp Management
 */

/**
 * Create a new stamp
 */
export async function createStamp(formData: FormData) {
  return apiPostFormData<Stamp>('/admin/stamp/create', formData);
}

/**
 * Edit an existing stamp
 */
export async function editStamp(stampId: string, formData: FormData) {
  return apiPutFormData<Stamp>(`/admin/stamp/edit/${stampId}`, formData);
}

/**
 * Delete a stamp
 */
export async function deleteStamp(stampId: string) {
  return apiDelete(`/admin/stamp/delete/${stampId}`);
}

/**
 * Get all stamps (admin view)
 */
export async function getAllStampsAdmin() {
  return apiGet<Stamp[]>('/admin/stamp/all');
}

/**
 * Admin User Management
 */

/**
 * Get all users
 */
export async function getAllUsers() {
  return apiGet<User[]>('/admin/user/all');
}

/**
 * Get user profile by ID (admin)
 */
export async function getUserProfileAdmin(userId: string) {
  return apiGet<User>(`/admin/user/${userId}`);
}

/**
 * Delete a user
 */
export async function deleteUser(userId: string) {
  return apiDelete(`/admin/user/${userId}`);
}
