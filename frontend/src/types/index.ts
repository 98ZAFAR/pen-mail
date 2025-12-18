// User Types
export interface User {
  _id: string;
  fullName: string;
  nickName: string;
  email: string;
  avatarUrl: string;
  countryCode: string;
  languages: string[];
  interests: string[];
  role: 'user' | 'admin';
  friends: string[];
  collectedStamps: string[];
  blockedUsers: string[];
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  nickName: string;
  email: string;
  password: string;
  countryCode: string;
  avatarUrl?: string;
  languages?: string[];
  interests?: string[];
}

// Letter Types
export interface Letter {
  _id: string;
  sender: User;
  recipient: User;
  stampId?: string;
  subject: string;
  body: string;
  status: 'draft' | 'sent' | 'received' | 'read' | 'archived';
  isArchived: boolean;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SendLetterPayload {
  recipientId: string;
  subject: string;
  body: string;
  stampId?: string;
}

export interface UpdateDraftPayload {
  subject: string;
  body: string;
  stampId?: string;
}

// Stamp Types
export interface Stamp {
  _id: string;
  name: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  description: string;
  imageUrl: string;
  countryCode: string;
  createdAt: string;
  updatedAt: string;
}

// Notification Types
export interface Notification {
  _id: string;
  user: string;
  type: 'letter' | 'friend_request' | 'friend_accept' | 'system';
  message: string;
  relatedId?: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

// Friend Request Types
export interface FriendRequest {
  _id: string;
  sender: User;
  recipient: User;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

// Pagination Types
export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// API Response Wrapper
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Array<{ field: string; message: string }>;
}

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  pagination?: PaginationInfo;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
