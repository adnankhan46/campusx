import { asyncHandler, ApiResponses } from '../../shared/utils/index.js';
import { paymentService } from '../payments/payment.service.js';

/**
 * Payment Controller - HTTP request handlers
 * Thin layer that delegates to service layer
 */

/**
 * Create a payment link for an opportunity
 * GET /api/company/payments/opportunity/:oppId
 */
export const makePayment = asyncHandler(async (req, res) => {
  const result = await paymentService.makePayment(req.params.oppId);
  res.status(200).json(ApiResponses.success(result, result.message));
});
