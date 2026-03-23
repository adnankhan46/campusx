import express from 'express';
import { getAllOpportunities, getOpportunityById } from './opportunity.controller.js';

const router = express.Router();

/**
 * Opportunity Routes
 * Base path: /api/opportunities
 */

// COMMON GET ROUTE
router.get('/getAllOpp', getAllOpportunities);
router.get('/:id', getOpportunityById); // when click on an Opportunity, For User/Admin/Company : [COMMON]

export default router;
