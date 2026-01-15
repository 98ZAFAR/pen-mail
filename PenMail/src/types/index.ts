export interface User {
  id: string;
  fullName: string;
  nickName: string;
  email: string;
  avatarUrl?: string;
  countryCode: string;
}

export interface Letter {
  id: string;
  sender: string;
  senderId: string;
  recipient: string;
  recipientId: string;
  subject: string;
  body: string;
  preview: string;
  status: 'draft' | 'sent' | 'received' | 'read' | 'archived';
  stampId?: string;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Friend {
  id: string;
  name: string;
  nickname: string;
  country: string;
  flag: string;
  avatarUrl?: string;
  mutualFriends?: number;
  lettersExchanged?: number;
}

export interface FriendRequest {
  id: string;
  name: string;
  nickname: string;
  country: string;
  flag: string;
  avatarUrl?: string;
}

export interface Stamp {
  id: string;
  name: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  color: string;
  imageUrl?: string;
  collected: boolean;
  description?: string;
}

export interface Notification {
  id: string;
  type: 'letter' | 'friend_request' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  data?: any;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
