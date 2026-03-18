import { asyncHandler, ApiResponses } from '../../shared/utils/index.js';
import { applicantService } from './applicant.service.js';

/**
 * Applicant Controller - HTTP request handlers
 * Thin layer that delegates to service layer
 */

/**
 * Get opportunity by ID (common endpoint for User/Admin/Company)
 * GET /api/applicants/:id
 */
export const getOpportunityById = asyncHandler(async (req, res) => {
  const opportunity = await applicantService.getOpportunityById(req.params.id);
  res.status(200).json(ApiResponses.success(opportunity));
});

/**
 * Apply for an opportunity
 * POST /api/applicants/opportunities/:id/apply
 */
export const applyForOpportunity = asyncHandler(async (req, res) => {
  const application = await applicantService.applyForOpportunity(
    req.params.id,
    req.user,
    req.body
  );

  res.status(200).json(
    ApiResponses.success(
      { message: 'Application submitted successfully', application },
      'Application submitted successfully'
    )
  );
});

/**
 * Get all opportunities a user has applied for
 * GET /api/applicants/applied-opp/:userId
 */
export const getMyAppliedOpp = asyncHandler(async (req, res) => {
  const opportunities = await applicantService.getMyAppliedOpp(req.params.userId);
  res.status(200).json(ApiResponses.success(opportunities));
});

/**
 * Get a single application detail by application ID
 * GET /api/applicants/applied-op/:applicationId
 */
export const getApplicationById = asyncHandler(async (req, res) => {
  const applicant = await applicantService.getApplicationById(req.params.applicationId);
  res.status(200).json(ApiResponses.success(applicant));
});
