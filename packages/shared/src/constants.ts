// ============================================
// Roles & Permissions
// ============================================

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export const PERMISSIONS = {
  USER_CREATE: 'user:create',
  USER_READ: 'user:read',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  FILE_CREATE: 'file:create',
  FILE_READ: 'file:read',
  FILE_UPDATE: 'file:update',
  FILE_DELETE: 'file:delete',
  ADMIN_ACCESS: 'admin:access',
} as const;

// ============================================
// Status Constants
// ============================================

export const FILE_STATUS = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
} as const;

export const UPLOAD_STATUS = {
  PENDING: 'pending',
  UPLOADING: 'uploading',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

// ============================================
// Limits
// ============================================

export const LIMITS = {
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
  MAX_FILES_PER_USER: 1000,
  MAX_PASSWORD_LENGTH: 128,
  MIN_PASSWORD_LENGTH: 8,
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
  JWT_EXPIRY: 15 * 60 * 1000, // 15 minutes
  JWT_REFRESH_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
  RATE_LIMIT: 1000, // requests per minute
} as const;

// ============================================
// API Constants
// ============================================

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const MIME_TYPES = {
  PDF: 'application/pdf',
  PNG: 'image/png',
  JPEG: 'image/jpeg',
  JSON: 'application/json',
  TEXT: 'text/plain',
} as const;

// ============================================
// Environment Variables
// ============================================

export const ENV_KEYS = {
  NODE_ENV: 'NODE_ENV',
  DATABASE_URL: 'DATABASE_URL',
  REDIS_URL: 'REDIS_URL',
  JWT_SECRET: 'JWT_SECRET',
  JWT_REFRESH_SECRET: 'JWT_REFRESH_SECRET',
  AWS_REGION: 'AWS_REGION',
  AWS_S3_BUCKET: 'AWS_S3_BUCKET',
  AWS_ACCESS_KEY_ID: 'AWS_ACCESS_KEY_ID',
  AWS_SECRET_ACCESS_KEY: 'AWS_SECRET_ACCESS_KEY',
  STRIPE_SECRET_KEY: 'STRIPE_SECRET_KEY',
  STRIPE_WEBHOOK_SECRET: 'STRIPE_WEBHOOK_SECRET',
} as const;

// ============================================
// Error Codes
// ============================================

export const ERROR_CODES = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  FILE_NOT_FOUND: 'FILE_NOT_FOUND',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

// ============================================
// Feature Flags
// ============================================

export const FEATURE_FLAGS = {
  AUTH_ENABLED: true,
  FILE_UPLOAD_ENABLED: true,
  PDF_RENDERING_ENABLED: true,
  COLLABORATION_ENABLED: false,
  AI_FEATURES_ENABLED: false,
  OCR_ENABLED: false,
} as const;

// ============================================
// Messages
// ============================================

export const MESSAGES = {
  // Success
  CREATED_SUCCESS: 'Created successfully',
  UPDATED_SUCCESS: 'Updated successfully',
  DELETED_SUCCESS: 'Deleted successfully',
  LOGIN_SUCCESS: 'Logged in successfully',
  LOGOUT_SUCCESS: 'Logged out successfully',

  // Errors
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_ALREADY_EXISTS: 'User already exists',
  USER_NOT_FOUND: 'User not found',
  FILE_NOT_FOUND: 'File not found',
  FILE_TOO_LARGE: 'File is too large. Maximum size is 100MB',
  INVALID_FILE_TYPE: 'Invalid file type',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  INTERNAL_ERROR: 'Internal server error',
} as const;
