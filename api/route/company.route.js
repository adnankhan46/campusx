import express from "express";
import { 
  handleCompanySignUp, 
  handleCompanySignIn, 
  updateCompanyPassword, 
  updateCompanyProfile,
  companyLogout,
  getCompanyProfile
} from "../controller/Company/company.controller.js";
 
import {
  createOpportunity,
  getOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
  closeOpportunity
} from "../controller/Company/opportunity.controller.js";

import { verifyToken, verifyCompanyOrAdmin } from "../middlewares/auth.js";

const router = express.Router();

// ✅ Public routes (no token required)
router.get("/", getOpportunities);
router.get("/:id", getOpportunityById);
router.post("/signup", handleCompanySignUp);
router.post("/signin", handleCompanySignIn);
router.post("/logout", companyLogout);

// ✅ Apply auth middleware after public routes
router.use(verifyToken);

// 🔒 Protected routes
router.get("/profile", getCompanyProfile);
router.put("/update-password", updateCompanyPassword);
router.put("/update-profile", updateCompanyProfile);

// ✅ Company/Admin only
router.post("/", verifyCompanyOrAdmin, createOpportunity);
router.put("/:id", verifyCompanyOrAdmin, updateOpportunity);
router.delete("/:id", verifyCompanyOrAdmin, deleteOpportunity);
router.put("/:id/close", verifyCompanyOrAdmin, closeOpportunity);

export default router;