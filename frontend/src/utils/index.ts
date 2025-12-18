/**
 * PenMail API Client
 * Complete API wrapper using Axios
 * Based on backend API documentation
 */

// Core API utilities
export * from './api';

// Authentication APIs
export * from './authApi';

// User management APIs
export * from './userApi';

// Letter management APIs
export * from './letterApi';

// Stamp APIs
export * from './stampApi';

// Admin APIs
export * from './adminApi';

// Notification APIs
export * from './notificationApi';

// General/Public APIs
export * from './generalApi';

// Configuration
export { default as config } from './config';
