/**
 * Production environment configuration
 */
export default {
  env: 'production',
  logLevel: 'error',
  
  // CORS - Only allow specific origins
  corsOrigins: [
    process.env.FRONTEND_ORIGIN,
  ].filter(Boolean),
  
  // Rate Limiting - Strict
  rateLimitWindow: 15 * 60 * 1000, // 15 minutes
  rateLimitMax: 100, // Strict limit
  
  // Logging
  enableConsoleLog: false,
  enableFileLog: true,
};