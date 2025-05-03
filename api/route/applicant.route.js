import express from "express";
import {
  applyForOpportunity,
  updateApplicantStatus,
  updatePaymentStatus,
  getMyOpportunities,
  getMyApplications
} from "../controller/User/applicant.controller.js";
import { verifyToken, verifyCompanyOrAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Apply verifyToken middleware to all routes in this router
router.use(verifyToken);

// User-specific routes
router.post("/opportunities/:id/apply", applyForOpportunity);
router.get("/my-applications", getMyApplications);

// Company/Admin-specific routes
router.get("/my-opportunities", verifyCompanyOrAdmin, getMyOpportunities);
router.put("/opportunities/:opportunityId/applicants/:userId", verifyCompanyOrAdmin, updateApplicantStatus);
router.put("/opportunities/:opportunityId/payments/:userId", verifyCompanyOrAdmin, updatePaymentStatus);

export default router;