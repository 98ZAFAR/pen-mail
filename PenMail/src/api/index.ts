/**
 * API Services Index
 * 
 * Central export for all API services
 */

export * from './config';
export { default as authApi } from './auth';
export { default as letterApi } from './letters';

// Export API config for easy access
export { API_CONFIG } from './config';
