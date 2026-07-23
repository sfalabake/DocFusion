import { z } from 'zod';

// ============================================
// User Types
// ============================================

export const UserRoleSchema = z.enum(['admin', 'user']);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const CreateUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  role: UserRoleSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

// ============================================
// Authentication Types
// ============================================

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: UserSchema,
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const RefreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export type RefreshTokenInput = z.infer<typeof RefreshTokenSchema>;

// ============================================
// File Types
// ============================================

export const FileStatusSchema = z.enum(['active', 'archived', 'deleted']);
export type FileStatus = z.infer<typeof FileStatusSchema>;

export const CreateFileSchema = z.object({
  name: z.string().min(1, 'File name is required'),
  description: z.string().optional(),
  size: z.number().min(0),
  mimeType: z.string(),
});

export type CreateFileInput = z.infer<typeof CreateFileSchema>;

export const FileSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  mimeType: z.string(),
  fileSize: z.number(),
  pageCount: z.number().nullable(),
  status: FileStatusSchema,
  storageKey: z.string(),
  isFavorite: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  lastAccessedAt: z.date().nullable(),
});

export type File = z.infer<typeof FileSchema>;

export const FileListResponseSchema = z.object({
  files: z.array(FileSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

export type FileListResponse = z.infer<typeof FileListResponseSchema>;

// ============================================
// API Response Types
// ============================================

export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  message: z.string().optional(),
  error: z.string().optional(),
});

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};

export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  statusCode: z.number(),
  timestamp: z.date(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

// ============================================
// Pagination Types
// ============================================

export const PaginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  search: z.string().optional(),
  sort: z.string().optional(),
});

export type PaginationInput = z.infer<typeof PaginationSchema>;

export const PaginatedResponseSchema = z.object({
  data: z.array(z.any()),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
