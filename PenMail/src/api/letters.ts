/**
 * Letters API Service
 * 
 * This file contains all letter-related API calls.
 */

import { apiFetch } from './config';
import type { Letter, ApiResponse, PaginatedResponse } from '../types';

interface CreateLetterRequest {
  recipientId: string;
  subject: string;
  body: string;
  stampId?: string;
  deliveredAt?: Date;
}

interface UpdateLetterRequest {
  subject?: string;
  body?: string;
  stampId?: string;
}

export const letterApi = {
  /**
   * Get all letters with pagination
   */
  getLetters: async (
    token: string,
    page: number = 1,
    limit: number = 10,
    status?: string,
  ): Promise<ApiResponse<PaginatedResponse<Letter>>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(status && { status }),
    });

    return apiFetch<ApiResponse<PaginatedResponse<Letter>>>(
      `/letters?${params}`,
      { method: 'GET' },
      token,
    );
  },

  /**
   * Get single letter by ID
   */
  getLetter: async (token: string, letterId: string): Promise<ApiResponse<Letter>> => {
    return apiFetch<ApiResponse<Letter>>(
      `/letters/${letterId}`,
      { method: 'GET' },
      token,
    );
  },

  /**
   * Create new letter
   */
  createLetter: async (
    token: string,
    letterData: CreateLetterRequest,
  ): Promise<ApiResponse<Letter>> => {
    return apiFetch<ApiResponse<Letter>>(
      '/letters',
      {
        method: 'POST',
        body: JSON.stringify(letterData),
      },
      token,
    );
  },

  /**
   * Update letter (draft only)
   */
  updateLetter: async (
    token: string,
    letterId: string,
    updates: UpdateLetterRequest,
  ): Promise<ApiResponse<Letter>> => {
    return apiFetch<ApiResponse<Letter>>(
      `/letters/${letterId}`,
      {
        method: 'PUT',
        body: JSON.stringify(updates),
      },
      token,
    );
  },

  /**
   * Delete letter
   */
  deleteLetter: async (token: string, letterId: string): Promise<ApiResponse<void>> => {
    return apiFetch<ApiResponse<void>>(
      `/letters/${letterId}`,
      { method: 'DELETE' },
      token,
    );
  },

  /**
   * Archive letter
   */
  archiveLetter: async (token: string, letterId: string): Promise<ApiResponse<Letter>> => {
    return apiFetch<ApiResponse<Letter>>(
      `/letters/${letterId}/archive`,
      { method: 'POST' },
      token,
    );
  },

  /**
   * Mark letter as read
   */
  markAsRead: async (token: string, letterId: string): Promise<ApiResponse<Letter>> => {
    return apiFetch<ApiResponse<Letter>>(
      `/letters/${letterId}/read`,
      { method: 'POST' },
      token,
    );
  },
};

export default letterApi;
