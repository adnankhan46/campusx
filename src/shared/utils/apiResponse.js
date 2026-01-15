/**
 * Standard API response formatter
 * 
 * @class ApiResponse
 */
export class ApiResponse {
  /**
   * Creates a success response
   * 
   * @param {number} statusCode - HTTP status code
   * @param {*} data - Response data
   * @param {string} [message='Success'] - Response message
   */
  constructor(statusCode, data, message = 'Success') {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
  }
}

/**
 * Common API response factories
 */
export const ApiResponses = {
  success: (data, message = 'Success') => new ApiResponse(200, data, message),
  created: (data, message = 'Created successfully') => new ApiResponse(201, data, message),
  noContent: (message = 'No content') => new ApiResponse(204, null, message),
};
