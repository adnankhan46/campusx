import { asyncHandler, ApiResponses} from '../../shared/utils/index.js';
import { authService } from './auth.service.js';

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

  // Set JWT cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    sameSite: 'Lax',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.status(201).json(ApiResponses.created(user, 'Account created successfully'));
});

/**
 * Handle user sign in
 * POST /api/auth/signin
 */
export const handleSignIn = asyncHandler(async (req, res) => {
  const { user, token } = await authService.signIn(req.body);

  // Set JWT cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    sameSite: 'Lax',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

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
  const result = await authService.updatePassword(req.body.newPassword);
  res.status(200).json(ApiResponses.success(result, 'Password updated successfully'));
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
