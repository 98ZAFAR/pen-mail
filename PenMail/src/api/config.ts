/**
 * API Configuration & Base Setup
 * 
 * This file contains the base API configuration and common API utilities.
 * Update the BASE_URL to match your backend server.
 */

// TODO: Update this with your actual backend URL
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000/api', // Update this!
  TIMEOUT: 30000,
};

/**
 * Common API Headers
 */
export const getHeaders = (token?: string): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Handle API Response
 */
export const handleResponse = async <T>(response: Response): Promise<T> => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');

  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    throw new Error(error);
  }

  return data;
};

/**
 * Base API Fetch with error handling
 */
export const apiFetch = async <T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...getHeaders(token),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    return handleResponse<T>(response);
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Example usage:
// 
// import { apiFetch } from './config';
// 
// const fetchUsers = async () => {
//   try {
//     const data = await apiFetch('/users', {
//       method: 'GET',
//     });
//     return data;
//   } catch (error) {
//     console.error('Failed to fetch users:', error);
//     throw error;
//   }
// };
