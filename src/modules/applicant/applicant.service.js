import Opportunity from '../opportunity/opportunity.model.js';
import Applicant from './applicant.model.js';
import { ApiErrors } from '../../shared/utils/index.js';

/**
 * Applicant Service - Business logic layer
 * Handles user/applicant-side operations
 */

export const applicantService = {
  /**
   * Get opportunity by ID
   * @param {string} id - Opportunity ID
   * @returns {Promise<Object>} Opportunity data
   */
  async getOpportunityById(id) {
    const opportunity = await Opportunity.findById(id);

    if (!opportunity) {
      throw ApiErrors.notFound('Opportunity not found');
    }

    return opportunity;
  },

  /**
   * Apply for an opportunity
   * @param {string} oppId - Opportunity ID
   * @param {Object} user - Authenticated user from req.user
   * @param {Object} body - Request body (coverLetter, proofOfWork)
   * @returns {Promise<Object>} Created application
   */
  async applyForOpportunity(oppId, user, body) {
    if (user.isCompany === true) {
      throw ApiErrors.forbidden('Companies cannot apply for opportunities');
    }

    const opportunity = await Opportunity.findById(oppId);

    if (!opportunity) {
      throw ApiErrors.notFound('Opportunity not found');
    }

    // Check if opportunity is open
    if (opportunity.status !== 'open') {
      throw ApiErrors.badRequest('This opportunity is no longer accepting applications');
    }

    // Check if deadline has passed
    if (new Date() > new Date(opportunity.deadline)) {
      opportunity.status = 'expired';
      await opportunity.save();
      throw ApiErrors.badRequest('Application deadline has passed');
    }

    // Check if user has already applied
    const alreadyApplied = opportunity.applicants.find(
      (applicant) => applicant.userId.toString() === user.id
    );

    if (alreadyApplied) {
      throw ApiErrors.badRequest('You have already applied for this opportunity');
    }

    // Extract proof of work from body
    const { coverLetter, proofOfWork } = body;

    // Create an applicant record in the Applicant collection
    const newApplicant = new Applicant({
      userId: user.id,
      opportunityId: oppId,
      coverLetter: coverLetter || 'No cover letter provided',
      proofOfWork: {
        screenshot: proofOfWork?.screenshot || null,
        link: proofOfWork?.link || null,
      },
      status: 'applied',
    });

    await newApplicant.save();

    // Add user to applicants list in opportunity
    opportunity.applicants.push({
      userId: user.id,
      status: 'applied',
      appliedAt: new Date(),
    });

    await opportunity.save();

    return newApplicant;
  },

  /**
   * Get opportunities a user has applied for
   * @param {string} userId - User ID from params
   * @returns {Promise<Array>} List of applied opportunities
   */
  async getMyAppliedOpp(userId) {
    const myOpp = await Opportunity.find({ 'applicants.userId': userId });

    if (myOpp.length === 0) {
      throw ApiErrors.notFound("YOU DIDN'T APPLIED FOR ANY OPPORTUNITY");
    }

    return myOpp;
  },

  /**
   * Get a single application detail by application ID
   * @param {string} applicationId - Applicant document ID
   * @returns {Promise<Object>} Applicant data
   */
  async getApplicationById(applicationId) {
    const applicant = await Applicant.findById(applicationId);

    if (!applicant) {
      throw ApiErrors.notFound("YOU DIDN'T APPLY FOR ANY OPPORTUNITY");
    }

    return applicant;
  },
};
