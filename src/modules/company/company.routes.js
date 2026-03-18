import express from 'express';
import {
  handleCompanySignUp,
  handleCompanySignIn,
  companyLogout,
  getCompanyProfile,
  updateCompanyPassword,
  updateCompanyProfile,
  getMyApplicants,
  updateApplicantStatus,
} from './company.controller.js';
import {
  createOpportunity,
  getOpportunityByCompanyId,
  updateOpportunity,
  deleteOpportunity,
  closeOpportunity,
} from '../opportunity/opportunity.controller.js';
import { makePayment } from '../payments/payment.controller.js';

import { verifyToken, verifyCompanyOrAdmin } from '../../shared/middleware/index.js';

const router = express.Router();

/**
 * Company/Provider Routes
 * Base path: /api/company
 * Ordered by: AUTH, PROFILE, OPPORTUNITY, PAYMENT, APPLICANTS
 */

// --- AUTH (public) ---
router.post('/signup', handleCompanySignUp);
router.post('/signin', handleCompanySignIn);
router.post('/logout', companyLogout);

// --- AUTH middleware (all routes below require login) ---
router.use(verifyToken);

// --- PROFILE ---
router.get('/profile', getCompanyProfile);
router.put('/update-password', updateCompanyPassword);
router.put('/update-profile', updateCompanyProfile);

// --- OPPORTUNITY ---
router.post('/create', verifyCompanyOrAdmin, createOpportunity);
router.get('/myopportunities/:id', verifyCompanyOrAdmin, getOpportunityByCompanyId); // for Company's Profile
router.put('/:id', verifyCompanyOrAdmin, updateOpportunity);
router.put('/:id/close', verifyCompanyOrAdmin, closeOpportunity);
router.delete('/:id', verifyCompanyOrAdmin, deleteOpportunity);

// --- PAYMENT ---
router.get('/payments/opportunity/:oppId', makePayment);

// --- APPLICANTS ---
router.get('/applicants/:id', verifyCompanyOrAdmin, getMyApplicants);
router.put('/applicants/status/:opportunityId/:userId', verifyCompanyOrAdmin, updateApplicantStatus);

export default router;
