import { apiGet, apiPost } from './api';
import { Stamp } from '@/types';

export interface StampQueryParams {
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  countryCode?: string;
}

/**
 * Get all stamps with optional filters
 */
export async function getAllStamps(params?: StampQueryParams) {
  const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
  return apiGet<Stamp[]>(`/stamp${queryString}`);
}

/**
 * Collect a stamp (adds to user's collection)
 */
export async function collectStamp(stampId: string) {
  return apiPost(`/stamp/collect/${stampId}`);
}

/**
 * Get user's collected stamps
 */
export async function getMyStamps() {
  return apiGet<Stamp[]>('/stamp/my-stamps');
}
