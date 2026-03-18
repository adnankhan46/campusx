import { asyncHandler, ApiResponses } from '../../shared/utils/index.js';
import { opportunityService } from './opportunity.service.js';

/**
 * Opportunity Controller - HTTP request handlers
 * Thin layer that delegates to service layer
 */

/**
 * Create a new opportunity
 * POST /api/company/create
 */
export const createOpportunity = asyncHandler(async (req, res) => {
  const opportunity = await opportunityService.createOpportunity(req.body, req.user);
  res.status(201).json(ApiResponses.created(opportunity, 'Opportunity created successfully'));
});

/**
 * Get opportunity by ID (common endpoint)
 * GET /api/company/:id
 */
export const getOpportunityById = asyncHandler(async (req, res) => {
  const opportunity = await opportunityService.getOpportunityById(req.params.id);
  res.status(200).json(ApiResponses.success(opportunity));
});

/**
 * Get all opportunities with pagination
 * GET /api/company/all-opportunities  (used by admin route)
 */
export const getAllOpportunities = asyncHandler(async (req, res) => {
  const result = await opportunityService.getAllOpportunities(req.query);
  res.status(200).json(ApiResponses.success(result));
});

/**
 * Get opportunities by company ID
 * GET /api/company/myopportunities/:id
 */
export const getOpportunityByCompanyId = asyncHandler(async (req, res) => {
  const result = await opportunityService.getOpportunityByCompanyId(req.params.id, req.query);
  res.status(200).json(ApiResponses.success(result));
});

/**
 * Update an opportunity
 * PUT /api/company/:id
 */
export const updateOpportunity = asyncHandler(async (req, res) => {
  const opportunity = await opportunityService.updateOpportunity(req.params.id, req.body, req.user);
  res.status(200).json(ApiResponses.success(opportunity, 'Opportunity updated successfully'));
});

/**
 * Delete an opportunity
 * DELETE /api/company/:id
 */
export const deleteOpportunity = asyncHandler(async (req, res) => {
  const result = await opportunityService.deleteOpportunity(req.params.id, req.user);
  res.status(200).json(ApiResponses.success(result, 'Opportunity deleted successfully'));
});

/**
 * Close an opportunity
 * PUT /api/company/:id/close
 */
export const closeOpportunity = asyncHandler(async (req, res) => {
  const opportunity = await opportunityService.closeOpportunity(req.params.id, req.user);
  res.status(200).json(ApiResponses.success({ message: 'Opportunity closed successfully', opportunity }));
});
