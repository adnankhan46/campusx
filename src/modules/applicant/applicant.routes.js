import express from 'express';
import {
  applyForOpportunity,
  getMyAppliedOpp,
  getApplicationById,
} from './applicant.controller.js';

import { verifyToken } from '../../shared/middleware/index.js';

const router = express.Router();

/**
 * Applicant Routes
 * Base path: /api/applicants
 */

router.use(verifyToken); // check Logged in


// APPLICANT
router.post('/opportunities/:id/apply', applyForOpportunity); // apply for an opp
router.get('/applied-opp/:userId', getMyAppliedOpp); // get only applied opp by user
router.get('/applied-op/:applicationId', getApplicationById); // get SINGLE applied opp detail by application id

export default router;
