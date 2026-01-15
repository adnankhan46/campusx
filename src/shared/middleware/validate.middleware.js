import { ApiError } from '../utils/apiError.js';

/**
 * Generic validation middleware using Zod schemas
 * 
 * @param {Object} schema - Zod schema object
 * @returns {Function} Express middleware
 * 
 * @example
 * import { z } from 'zod';
 * const schema = z.object({
 *   body: z.object({
 *     email: z.string().email(),
 *     password: z.string().min(8)
 *   })
 * });
 * 
 * router.post('/login', validate(schema), loginController);
 */
export const validate = (schema) => (req, res, next) => {
  try {
    // Validate request data against schema
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    
    next();
  } catch (error) {
    // Format Zod errors into readable format
    const errors = error.errors?.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    })) || [];

    const errorMessage = errors.length > 0 
      ? errors.map(e => `${e.field}: ${e.message}`).join(', ')
      : 'Validation failed';

    next(new ApiError(400, errorMessage));
  }
};