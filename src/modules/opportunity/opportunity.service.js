import mongoose from 'mongoose';
import Opportunity from './opportunity.model.js';
import Company from '../company/company.model.js';
import User from '../auth/user.model.js';
import { ApiErrors } from '../../shared/utils/index.js';

/**
 * Opportunity Service - Business logic layer
 * Handles opportunity CRUD operations
 */

export const opportunityService = {
  /**
   * Create a new opportunity
   * @param {Object} data - Opportunity data from req.body
   * @param {Object} user - req.user (decoded JWT)
   * @returns {Promise<Object>} Created opportunity
   */
  async createOpportunity(data, user) {
    const { title, description, numberOfOpenings, isPaid, amount, deadline, proofOfWork, type } = data;

    // Validate required fields
    if (!title || !description || !numberOfOpenings || isPaid === undefined || !deadline || !type) {
      throw ApiErrors.badRequest('Please provide all required fields');
    }

    // Validate amount if isPaid is true
    if (isPaid && (!amount || amount <= 0)) {
      throw ApiErrors.badRequest('Please provide a valid amount for paid opportunity');
    }

    // Validate deadline is in the future
    const deadlineDate = new Date(deadline);
    if (deadlineDate <= new Date()) {
      throw ApiErrors.badRequest('Deadline must be in the future');
    }

    let creatorModel;
    let creatorName;

    // Determine if creator is company or user
    if (user.isCompany) {
      creatorModel = await Company.findById(user.id);
      if (!creatorModel) {
        throw ApiErrors.notFound('Company not found');
      }
      creatorName = creatorModel.name;
    } else if (user.isAdmin) {
      creatorModel = await User.findById(user.id);
      if (!creatorModel) {
        throw ApiErrors.notFound('User not found');
      }
      creatorName = creatorModel.username;
    } else {
      throw ApiErrors.forbidden('Only companies or admins can create opportunities');
    }

    const newOpportunity = new Opportunity({
      title,
      description,
      numberOfOpenings,
      isPaid,
      amount: isPaid ? amount : 0,
      deadline: deadlineDate,
      proofOfWork: proofOfWork || { screenshot: null, link: null },
      type,
      status: 'open',
      creator: user.isCompany ? 'Company' : 'User',
      createdBy: {
        id: user.id,
        name: creatorName,
      },
    });

    const savedOpportunity = await newOpportunity.save();
    return savedOpportunity;
  },

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
   * Get all opportunities with pagination
   * @param {Object} query - { page, limit }
   * @returns {Promise<Object>} { opportunities, currentPage, totalPages, hasMore }
   */
  async getAllOpportunities(query) {
    const { page = 1, limit = 6 } = query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const opportunities = await Opportunity.find()
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalOpp = await Opportunity.countDocuments();
    const hasMore = (pageNumber * limitNumber) < totalOpp;

    return {
      opportunities,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalOpp / limitNumber),
      hasMore,
    };
  },

  /**
   * Get opportunities by company ID
   * @param {string} companyId
   * @param {Object} query - { page, limit, sort }
   * @returns {Promise<Object>} { opportunities, currentPage, totalPages, hasMore, totalCount }
   */
  async getOpportunityByCompanyId(companyId, query) {
    const { page = 1, limit = 10, sort = '-createdAt' } = query;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      throw ApiErrors.badRequest('Invalid company ID format');
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const filter = {
      creator: 'Company',
      'createdBy.id': new mongoose.Types.ObjectId(companyId),
    };

    const opportunities = await Opportunity.find(filter)
      .populate({
        path: 'applicants.userId',
        select: 'name email profile',
      })
      .populate({
        path: 'selectedCandidates.userId',
        select: 'name email profile',
      })
      .sort(sort)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalOpportunities = await Opportunity.countDocuments(filter);
    const hasMore = (pageNumber * limitNumber) < totalOpportunities;

    const opportunitiesData = opportunities.map((opp) => opp.toObject({ virtuals: true }));

    return {
      opportunities: opportunitiesData,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalOpportunities / limitNumber),
      hasMore,
      totalCount: totalOpportunities,
    };
  },

  /**
   * Update an opportunity
   * @param {string} id - Opportunity ID
   * @param {Object} updates - Fields to update
   * @param {Object} user - req.user
   * @returns {Promise<Object>} Updated opportunity
   */
  async updateOpportunity(id, updates, user) {
    const opportunity = await Opportunity.findById(id);

    if (!opportunity) {
      throw ApiErrors.notFound('Opportunity not found');
    }

    // Check authorization
    if (
      opportunity.createdBy.id.toString() !== user.id &&
      !user.isAdmin
    ) {
      throw ApiErrors.forbidden('You are not authorized to update this opportunity');
    }

    // Validate deadline if provided
    if (updates.deadline) {
      const deadlineDate = new Date(updates.deadline);
      if (deadlineDate <= new Date()) {
        throw ApiErrors.badRequest('Deadline must be in the future');
      }
      updates.deadline = deadlineDate;
    }

    // Validate amount if isPaid is updated to true
    if (updates.isPaid === true && (!updates.amount || updates.amount <= 0)) {
      throw ApiErrors.badRequest('Please provide a valid amount for paid opportunity');
    }

    const updatedOpportunity = await Opportunity.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    return updatedOpportunity;
  },

  /**
   * Delete an opportunity
   * @param {string} id - Opportunity ID
   * @param {Object} user - req.user
   * @returns {Promise<Object>} Success message
   */
  async deleteOpportunity(id, user) {
    const opportunity = await Opportunity.findById(id);

    if (!opportunity) {
      throw ApiErrors.notFound('Opportunity not found');
    }

    if (
      opportunity.createdBy.id.toString() !== user.id &&
      !user.isAdmin
    ) {
      throw ApiErrors.forbidden('You are not authorized to delete this opportunity');
    }

    await Opportunity.findByIdAndDelete(id);

    return { message: 'Opportunity deleted successfully' };
  },

  /**
   * Close an opportunity
   * @param {string} id - Opportunity ID
   * @param {Object} user - req.user
   * @returns {Promise<Object>} Closed opportunity
   */
  async closeOpportunity(id, user) {
    const opportunity = await Opportunity.findById(id);

    if (!opportunity) {
      throw ApiErrors.notFound('Opportunity not found');
    }

    if (
      opportunity.createdBy.id.toString() !== user.id &&
      !user.isAdmin
    ) {
      throw ApiErrors.forbidden('You are not authorized to close this opportunity');
    }

    opportunity.status = 'closed';
    await opportunity.save();

    return opportunity;
  },
};
