import { z } from 'zod';
import { emailSchema, passwordSchema } from '../../shared/validators/common.validation.js';

/**
 * Auth validation schemas using Zod
 */

export const signUpSchema = z.object({
  body: z.object({
    admissionNumber: z.string()
      .regex(/^\d{4}$/, 'Admission number must be exactly 4 digits'),
    email: emailSchema,
    password: passwordSchema,
    section: z.string().min(1, 'Section is required'),
    gender: z.enum(['Male', 'Female'], {
      errorMap: () => ({ message: 'Gender must be either Male or Female' })
    }),
  })
});

export const signInSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: z.string().min(1, 'Password is required'),
  })
});

export const updatePasswordSchema = z.object({
  body: z.object({
    newPassword: passwordSchema,
  })
});

export const updateFullNameSchema = z.object({
  body: z.object({
    fullname: z.string()
      .min(2, 'Full name must be at least 2 characters')
      .max(100, 'Full name must not exceed 100 characters')
      .regex(/^[a-zA-Z\s]*$/, 'Full name can only contain letters and spaces'),
  })
});

export const updateUPISchema = z.object({
  body: z.object({
    upi: z.string()
      .regex(/^[a-zA-Z0-9._-]{3,}@[a-zA-Z0-9]{2,}$/, 'Invalid UPI format (example: username@bank)'),
  })
});

export const updateAuthStatusSchema = z.object({
  body: z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID'),
    isAuthenticated: z.boolean().optional(),
  })
});