import { asyncHandler, ApiResponses } from '../../shared/utils/index.js';
import { authService } from './auth.service.js';
import { getCookieOptions } from '../../shared/utils/cookieConfig.js';

/**
 * Auth Controller - HTTP request handlers
 * Thin layer that delegates to service layer
 */

/**
 * Handle user sign up
 * POST /api/auth/signup
 */
export const handleSignUp = asyncHandler(async (req, res) => {
  const { user, token } = await authService.signUp(req.body);

  // Set JWT cookie with environment-aware options
  res.cookie('jwt', token, getCookieOptions());

  res.status(201).json(ApiResponses.created(user, 'Account created successfully'));
});

/**
 * Handle user sign in
 * POST /api/auth/signin
 */
export const handleSignIn = asyncHandler(async (req, res) => {
  const { user, token } = await authService.signIn(req.body);

  // Set JWT cookie with environment-aware options
  res.cookie('jwt', token, getCookieOptions());

  res.status(200).json(ApiResponses.success(user, 'Sign in successful'));
});

/**
 * Handle user logout
 * POST /api/auth/logout
 */
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json(ApiResponses.success(null, 'Signout successful'));
});

/**
 * Update user password
 * POST /api/auth/updatepassword
 */
export const updatePassword = asyncHandler(async (req, res) => {
  const result = await authService.updatePassword(req.body.newPassword, req.user.id);
  res.status(200).json(ApiResponses.success(result, 'Password updated successfully'));
});

/**
 * Update user Full Name
 * POST /api/auth/updatefullname
 */
export const updateFullName = asyncHandler(async (req, res) => {
  const result = await authService.updateFullName(req.body.fullname , req.user.id);
  res.status(200).json(ApiResponses.success(result, 'Full Name updated successfully'));
});

/**
 * Update user UPI
 * POST /api/auth/updateupi
 */
export const updateUPI = asyncHandler(async (req, res) => {
  const result = await authService.updateUPI(req.body.upi , req.user.id);
  res.status(200).json(ApiResponses.success(result, 'UPI updated successfully'));
});

/**
 * Update user authentication status
 * POST /api/auth/update-authentication
 */
export const updateAuthenticationStatus = asyncHandler(async (req, res) => {
  const { userId, isAuthenticated } = req.body;
  const user = await authService.updateAuthStatus(userId, isAuthenticated);
  res.status(200).json(ApiResponses.success(user, 'Authentication status updated'));
});
