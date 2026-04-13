/**
 * Application Constants and Environment Configuration
 */

export const ENV = {
  // IAM env vars kept for compatibility (unused in local auth mode)
  IAM_BASE_URL: import.meta.env.VITE_IAM_BASE_URL || 'http://localhost:8080',
  IAM_REALM: import.meta.env.VITE_IAM_REALM || 'myrealm',
  IAM_CLIENT_ID: import.meta.env.VITE_IAM_CLIENT_ID || 'myclient',
  
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4322',
  
  // Environment
  IS_PRODUCTION: import.meta.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: import.meta.env.NODE_ENV === 'development',
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  AUTH_USER: 'auth_user',
  ORG_ID: 'org:id',
  ORG_ROLE: 'org:role',
  ORG_DATA: 'org:data',
  ORG_USER: 'org:user',
  ORG_AVAILABLE: 'org:available',
  SELECTED_ORG_ID: 'selected_org_id', // localStorage only
};

// Cache Configuration
export const CACHE_CONFIG = {
  ORG_MAX_AGE: 10 * 60 * 1000, // 10 minutes
  TOKEN_REFRESH_INTERVAL: 60 * 1000, // 60 seconds
  TOKEN_MIN_VALIDITY: 30, // 30 seconds
};
