import { apiGet, apiPost, apiPut, apiDelete } from './api';
import { Letter, SendLetterPayload, UpdateDraftPayload } from '@/types';

/**
 * Get inbox letters
 */
export async function getInbox() {
  return apiGet<Letter[]>('/letter/inbox');
}

/**
 * Get outbox letters
 */
export async function getOutbox() {
  return apiGet<Letter[]>('/letter/outbox');
}

/**
 * Get draft letters
 */
export async function getDrafts() {
  return apiGet<Letter[]>('/letter/drafts');
}

/**
 * Get archived letters
 */
export async function getArchivedLetters() {
  return apiGet<Letter[]>('/letter/archived');
}

/**
 * Get single letter by ID
 */
export async function getLetter(id: string) {
  return apiGet<Letter>(`/letter/get-letter/${id}`);
}

/**
 * Send a new letter
 */
export async function sendLetter(data: SendLetterPayload) {
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
export async function sendDraft(id: string) {
  return apiPost<Letter>(`/letter/draft/${id}/send`);
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
 * Delete a letter
 */
export async function deleteLetter(id: string) {
  return apiDelete(`/letter/delete-letter/${id}`);
}
