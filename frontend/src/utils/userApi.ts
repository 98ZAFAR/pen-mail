import { apiGet, apiPut, apiDelete, apiPutFormData } from './api';
import { User, FriendRequest } from '@/types';

/**
 * Get user profile
 */
export async function getUserProfile() {
  return apiGet<User>('/user/profile');
}

/**
 * Update user profile
 */
export async function updateUserProfile(formData: FormData) {
  return apiPutFormData<User>('/user/update', formData);
}

/**
 * Get all friends
 */
export async function getFriends() {
  return apiGet<User[]>('/user/get-friends');
}

/**
 * Get friend profile by ID
 */
export async function getFriendProfile(friendId: string) {
  return apiGet<User>(`/user/get-friends/${friendId}`);
}

/**
 * Get discover users
 */
export async function getDiscoverUsers() {
  return apiGet<User[]>('/user/discover');
}

/**
 * Send friend request
 */
export async function connectFriend(friendId: string) {
  return apiPut(`/user/connect-friend/${friendId}`);
}

/**
 * Unfriend a user
 */
export async function unfriend(friendId: string) {
  return apiDelete(`/user/unfriend/${friendId}`);
}

/**
 * Get friend requests (received and sent)
 */
export async function getFriendRequests() {
  return apiGet<{ received: FriendRequest[]; sent: FriendRequest[] }>('/user/friend-requests');
}

/**
 * Accept friend request
 */
export async function acceptFriendRequest(requestId: string) {
  return apiPut(`/user/friend-request/${requestId}`);
}

/**
 * Reject friend request
 */
export async function rejectFriendRequest(requestId: string) {
  return apiDelete(`/user/friend-request/${requestId}`);
}

/**
 * Cancel sent friend request
 */
export async function cancelFriendRequest(requestId: string) {
  return apiDelete(`/user/friend-request/cancel/${requestId}`);
}

/**
 * Block user
 */
export async function blockUser(userId: string) {
  return apiPut(`/user/block/${userId}`);
}

/**
 * Unblock user
 */
export async function unblockUser(userId: string) {
  return apiDelete(`/user/unblock/${userId}`);
}

/**
 * Get blocked users
 */
export async function getBlockedUsers() {
  return apiGet<User[]>('/user/blocked-users');
}
