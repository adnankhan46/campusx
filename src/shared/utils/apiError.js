/**
 * Custom API Error class for standard error handling
 * 
 * @class ApiError
 * @extends {Error}
 */
export class ApiError extends Error {
  /**
   * Creates an instance of ApiError
   * 
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Error message
   * @param {boolean} [isOperational=true] - Whether error is operational (expected)
   * @param {string} [stack=''] - Error stack trace
   */
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.success = false;
    
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Common API error factories
 */
export const ApiErrors = {
  badRequest: (message = 'Bad Request') => new ApiError(400, message),
  unauthorized: (message = 'Unauthorized') => new ApiError(401, message),
  forbidden: (message = 'Forbidden') => new ApiError(403, message),
  notFound: (message = 'Not Found') => new ApiError(404, message),
  conflict: (message = 'Conflict') => new ApiError(409, message),
  unprocessable: (message = 'Unprocessable Entity') => new ApiError(422, message),
  internal: (message = 'Internal Server Error') => new ApiError(500, message),
};
