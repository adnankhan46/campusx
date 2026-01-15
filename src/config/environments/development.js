/**
 * Development environment configuration
 */
export default {
  env: 'development',
  logLevel: 'debug',
  
  // CORS
  corsOrigins: [
    'http://localhost:5173',
    'http://localhost:3000',
  ],
  
  // Rate Limiting
  rateLimitWindow: 15 * 60 * 1000, // 15 minutes
  rateLimitMax: 1000,
  
  // Logging
  enableConsoleLog: true,
  enableFileLog: true,
};