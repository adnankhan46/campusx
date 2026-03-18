import Company from './company.model.js';
import Opportunity from '../opportunity/opportunity.model.js';
import User from '../auth/user.model.js';
import { ApiErrors } from '../../shared/utils/index.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config/index.js';

/**
 * Company Service - Business logic layer
 * Handles company/provider auth, profile, and applicant management
 */

export const companyService = {
  /**
   * Company sign up
   * @param {Object} data - { username, name, email, password, url }
   * @returns {Promise<Object>} { company, token }
   */
  async signUp(data) {
    const { username, name, email, password, url } = data;

    if (
      !username || !name || !email || !password ||
      username === '' || name === '' || email === '' || password === ''
    ) {
      throw ApiErrors.badRequest('Username, name, email and password are required');
    }

    // Check for existing company
    const existingCompany = await Company.findOne({
      $or: [{ email }, { username }],
    });

    if (existingCompany) {
      throw ApiErrors.badRequest('Email or username already in use');
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newCompany = new Company({
      username,
      name,
      email,
      password: hashedPassword,
      url: url || null,
    });

    const savedCompany = await newCompany.save();
    const { password: _, ...rest } = savedCompany._doc;

    // JWT token
    const token = jwt.sign(
      { id: savedCompany._id, isCompany: true },
      config.jwtSecret
    );

    return { company: rest, token };
  },

  /**
   * Company sign in
   * @param {Object} credentials - { username, password }
   * @returns {Promise<Object>} { company, token }
   */
  async signIn(credentials) {
    const { username, password } = credentials;

    if (!username || !password || username === '' || password === '') {
      throw ApiErrors.badRequest('Username and password are required');
    }

    // Find company by username or email
    const company = await Company.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!company) {
      throw ApiErrors.badRequest('Invalid username/email or password');
    }

    const isPasswordValid = await bcryptjs.compare(password, company.password);
    if (!isPasswordValid) {
      throw ApiErrors.badRequest('Invalid username/email or password');
    }

    const token = jwt.sign(
      { id: company._id, isCompany: true, isAdmin: false },
      config.jwtSecret,
      { expiresIn: '3d' }
    );

    const { password: _, ...rest } = company._doc;

    return { company: rest, token };
  },

  /**
   * Update company password
   * @param {string} companyId - Company ID from req.user
   * @param {string} currentPassword
   * @param {string} newPassword
   * @returns {Promise<Object>} Success message
   */
  async updatePassword(companyId, currentPassword, newPassword) {
    const company = await Company.findById(companyId);

    if (!company) {
      throw ApiErrors.notFound('Company not found');
    }

    // Verify current password
    const isPasswordValid = await bcryptjs.compare(currentPassword, company.password);
    if (!isPasswordValid) {
      throw ApiErrors.badRequest('Current password is incorrect');
    }

    const hashedNewPassword = bcryptjs.hashSync(newPassword, 10);
    company.password = hashedNewPassword;
    await company.save();

    return { message: 'Password updated successfully' };
  },

  /**
   * Update company profile
   * @param {string} companyId - Company ID from req.user
   * @param {Object} data - { name, url, profilePicture }
   * @returns {Promise<Object>} Updated company (without password)
   */
  async updateProfile(companyId, data) {
    const { name, url, profilePicture } = data;

    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      {
        $set: {
          name,
          url,
          profilePicture,
        },
      },
      { new: true }
    );

    if (!updatedCompany) {
      throw ApiErrors.notFound('Company not found');
    }

    const { password, ...rest } = updatedCompany._doc;
    return rest;
  },

  /**
   * Get company profile
   * @param {string} companyId - Company ID from req.user
   * @returns {Promise<Object>} Company data (without password)
   */
  async getProfile(companyId) {
    const company = await Company.findById(companyId);
    if (!company) {
      throw ApiErrors.notFound('Company not found');
    }

    const { password, ...rest } = company._doc;
    return rest;
  },

  /**
   * Get applicants of a particular opportunity
   * @param {string} opportunityId - Opportunity ID
   * @returns {Promise<Array>} List of applicants
   */
  async getMyApplicants(opportunityId) {
    const opportunity = await Opportunity.findById(opportunityId);

    if (!opportunity) {
      throw ApiErrors.notFound('NO OPPORTUNITY FOUND');
    }

    const applicants = opportunity.applicants;
    if (!applicants || applicants.length === 0) {
      return { message: 'No applicants yet.' };
    }

    return applicants;
  },

  /**
   * Update the status of an applicant (applied → shortlisted/selected/rejected)
   * @param {string} opportunityId
   * @param {string} userId
   * @param {string} status - 'applied' | 'shortlisted' | 'selected' | 'rejected'
   * @param {Object} reqUser - req.user
   * @returns {Promise<Object>} Updated opportunity
   */
  async updateApplicantStatus(opportunityId, userId, status, reqUser) {
    // Validate status
    if (!['applied', 'shortlisted', 'selected', 'rejected'].includes(status)) {
      throw ApiErrors.badRequest('Invalid status');
    }

    const opportunity = await Opportunity.findById(opportunityId);

    if (!opportunity) {
      throw ApiErrors.notFound('Opportunity not found');
    }

    // Check authorization
    if (
      opportunity.createdBy.id.toString() !== reqUser.id &&
      !reqUser.isAdmin
    ) {
      throw ApiErrors.forbidden('You are not authorized to update applicant status');
    }

    // Find the applicant
    const applicantIndex = opportunity.applicants.findIndex(
      (applicant) => applicant.userId.toString() === userId
    );

    if (applicantIndex === -1) {
      throw ApiErrors.notFound('Applicant not found');
    }

    // Update status
    opportunity.applicants[applicantIndex].status = status;

    // If selected, add to selectedCandidates
    if (status === 'selected') {
      const alreadySelected = opportunity.selectedCandidates.find(
        (candidate) => candidate.userId.toString() === userId
      );

      if (!alreadySelected) {
        opportunity.selectedCandidates.push({ userId });
      }
    }

    await opportunity.save();

    return opportunity;
  },
};
