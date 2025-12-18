import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true, // Include cookies in requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error
      const errorData = error.response.data as any;
      throw new Error(errorData?.message || `HTTP Error: ${error.response.status}`);
    } else if (error.request) {
      // Request made but no response
      throw new Error('No response from server');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
);

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * GET request
 */
export async function apiGet<T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await axiosInstance.get<ApiResponse<T>>(endpoint, config);
  return response.data;
}

/**
 * POST request
 */
export async function apiPost<T>(
  endpoint: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await axiosInstance.post<ApiResponse<T>>(endpoint, data, config);
  return response.data;
}

/**
 * PUT request
 */
export async function apiPut<T>(
  endpoint: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await axiosInstance.put<ApiResponse<T>>(endpoint, data, config);
  return response.data;
}

/**
 * DELETE request
 */
export async function apiDelete<T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await axiosInstance.delete<ApiResponse<T>>(endpoint, config);
  return response.data;
}

/**
 * FormData POST request (for file uploads)
 */
export async function apiPostFormData<T>(
  endpoint: string,
  formData: FormData,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await axiosInstance.post<ApiResponse<T>>(endpoint, formData, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...config?.headers,
    },
  });
  return response.data;
}

/**
 * FormData PUT request (for file uploads)
 */
export async function apiPutFormData<T>(
  endpoint: string,
  formData: FormData,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await axiosInstance.put<ApiResponse<T>>(endpoint, formData, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...config?.headers,
    },
  });
  return response.data;
}
