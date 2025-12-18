import { apiGet, apiPost, apiPut, apiDelete } from './api';
import { Letter, SendLetterPayload, UpdateDraftPayload } from '@/types';

export interface LetterQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
}

/**
 * Get inbox letters with pagination and search
 */
export async function getInbox(params?: LetterQueryParams) {
  const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
  return apiGet<Letter[]>(`/letter/inbox${queryString}`);
}

/**
 * Get outbox letters with pagination and search
 */
export async function getOutbox(params?: LetterQueryParams) {
  const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
  return apiGet<Letter[]>(`/letter/outbox${queryString}`);
}

/**
 * Get draft letters with pagination
 */
export async function getDrafts(page: number = 1, limit: number = 10) {
  return apiGet<Letter[]>(`/letter/drafts?page=${page}&limit=${limit}`);
}

/**
 * Get archived letters with pagination
 */
export async function getArchivedLetters(page: number = 1, limit: number = 10) {
  return apiGet<Letter[]>(`/letter/archived?page=${page}&limit=${limit}`);
}

/**
 * Get single letter by ID (marks as read if recipient)
 */
export async function getLetter(id: string) {
  return apiGet<Letter>(`/letter/get-letter/${id}`);
}

/**
 * Send a new letter or save as draft
 */
export async function sendLetter(data: SendLetterPayload & { isDraft?: boolean }) {
  return apiPost<Letter>('/letter/send-letter', data);
}

/**
 * Update a draft letter
 */
export async function updateDraft(id: string, data: UpdateDraftPayload) {
  return apiPut<Letter>(`/letter/draft/${id}`, data);
}

/**
 * Send a draft letter
 */
export async function sendDraft(id: string, recipientId: string) {
  return apiPost<Letter>(`/letter/draft/${id}/send`, { recipientId });
}

/**
 * Archive a letter
 */
export async function archiveLetter(id: string) {
  return apiPut(`/letter/archive/${id}`);
}

/**
 * Unarchive a letter
 */
export async function unarchiveLetter(id: string) {
  return apiPut(`/letter/unarchive/${id}`);
}

/**
 * Delete a letter (only sender can delete their sent letters)
 */
export async function deleteLetter(id: string) {
  return apiDelete(`/letter/delete-letter/${id}`);
}
