import express from 'express';
import { validate } from '../../shared/middleware/index.js';
import {
  handleSignUp,
  handleSignIn,
  logout,
  updatePassword,
  updateAuthenticationStatus,
} from './auth.controller.js';
import {
  signUpSchema,
  signInSchema,
  updatePasswordSchema,
  updateAuthStatusSchema,
} from './auth.validation.js';

// Import old middleware temporarily (will be migrated later)
import { isAuthenticated } from '../../../api/middlewares/isAuthenticated.js';
import { ipLimiter } from '../../../api/middlewares/rate-limiter.js';

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

// Logout - requires authentication
router.post('/logout', isAuthenticated, logout);

// Update authentication status - with validation
router.post('/update-authentication', validate(updateAuthStatusSchema), updateAuthenticationStatus);

export default router;