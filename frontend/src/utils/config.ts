/**
 * Environment configuration
 * Centralizes all environment variables
 */

export const config = {
  // API Configuration
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  
  // App Configuration
  appName: 'PenMail',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001',
  
  // Feature Flags
  features: {
    enableStamps: true,
    enableNotifications: true,
    enableSearch: false, // To be implemented
  },
  
  // Limits
  limits: {
    maxInterests: 10,
    maxLanguages: 5,
    maxFileSize: 5 * 1024 * 1024, // 5MB
  },
} as const;

export default config;
