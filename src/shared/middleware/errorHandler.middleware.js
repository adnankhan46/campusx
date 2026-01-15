import { ApiError } from '../utils/apiError.js';
import logger from '../../../api/utils/logger.js';

/**
 * Global error handler middleware
 * Catches all errors and sends standardized error response
 * 
 * @param {Error} err - Error object
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express next function
 */
export const errorHandler = (err, req, res, next) => {
  let error = err;

  // Convert non-ApiError errors to ApiError
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, false);
  }

  const { statusCode, message } = error;

  // Log error with request context
  const errorLog = {
    statusCode,
    message,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    requestId: req.id,
  };

  if (statusCode >= 500) {
    logger.error(`[ERROR]: ${JSON.stringify(errorLog)}`);
    if (process.env.NODE_ENV === 'development') {
      logger.error(`Stack: ${error.stack}`);
    }
  } else {
    logger.warn(`[WARN]: ${JSON.stringify(errorLog)}`);
  }

  // Send error response
  const response = {
    success: false,
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  };

  res.status(statusCode).json(response);
};