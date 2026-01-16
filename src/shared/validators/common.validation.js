import { z } from 'zod';

/**
 * Common validation z schemas that can be reused across modules
 */

// MongoDB ObjectId validation
export const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, {
  message: 'Invalid MongoDB ObjectId',
});

export const emailSchema = z.string().email({
  message: 'Invalid email address',
});


export const passwordSchema = z.string().min(4, {
  message: 'Password must be at least 4 characters',
});

export const paginationSchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).optional().default('1'),
  limit: z.string().regex(/^\d+$/).transform(Number).optional().default('10'),
});

export const dateSchema = z.string().datetime({
  message: 'Invalid date format. Use ISO 8601 format',
});

export const urlSchema = z.string().url({
  message: 'Invalid URL',
});

export const phoneSchema = z.string().regex(/^[0-9]{10}$/, {
  message: 'Phone number must be 10 digits',
}).optional();