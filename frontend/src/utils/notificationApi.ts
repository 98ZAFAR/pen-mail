import { apiGet, apiPut } from './api';
import { Notification } from '@/types';

/**
 * Get all notifications for current user
 */
export async function getNotifications() {
  return apiGet<Notification[]>('/notification');
}

/**
 * Get unread notification count
 */
export async function getUnreadCount() {
  return apiGet<{ count: number }>('/notification/unread-count');
}

/**
 * Mark notification as read
 */
export async function markAsRead(notificationId: string) {
  return apiPut(`/notification/mark-read/${notificationId}`);
}

/**
 * Mark all notifications as read
 */
export async function markAllAsRead() {
  return apiPut('/notification/mark-all-read');
}
