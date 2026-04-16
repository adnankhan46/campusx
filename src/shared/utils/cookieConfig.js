import { NODE_ENV } from './constants.js';

/**
 * Get environment-aware cookie options for JWT authentication
 * Automatically adjusts for development (HTTP) and production (HTTPS cross-origin)
 * 
 * @returns {Object} Cookie configuration object
 */
export const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === NODE_ENV.PRODUCTION;
  
  return {
    httpOnly: true,
    secure: isProduction, // true for HTTPS in production, false for HTTP in dev
    sameSite: isProduction ? 'None' : 'Lax', // 'None' for cross-origin in production
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  };
};
