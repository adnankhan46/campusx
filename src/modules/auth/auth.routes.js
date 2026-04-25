import express from 'express';
import { validate, isAuthenticated, ipLimiter, verifyToken } from '../../shared/middleware/index.js';
import {
  handleSignUp,
  handleSignIn,
  logout,
  updatePassword,
  updateFullName,
  updateUPI,
  updateAuthenticationStatus,
} from './auth.controller.js';
import {
  signUpSchema,
  signInSchema,
  updatePasswordSchema,
  updateFullNameSchema,
  updateUPISchema,
  updateAuthStatusSchema,
} from './auth.validation.js';


const router = express.Router();

/**
 * Auth Routes
 * Base path: /api/auth
 */

// Sign up - with validation and rate limiting
router.post('/signup', ipLimiter, validate(signUpSchema), handleSignUp);

// Sign in - with validation and rate limiting
router.post('/signin', ipLimiter, validate(signInSchema), handleSignIn);

// Update password - with validation
router.post('/updatepassword', validate(updatePasswordSchema), updatePassword);

// Update full name - with validation
router.post('/updatefullname',verifyToken, validate(updateFullNameSchema), updateFullName);

// Update UPI - with validation
router.post('/updateupi', validate(updateUPISchema), updateUPI);

// Logout - requires authentication
router.post('/logout', isAuthenticated, logout);

// Update authentication status - with validation
router.post('/update-authentication', validate(updateAuthStatusSchema), updateAuthenticationStatus);

export default router;