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
  closeOpportunity,
  getOpportunityByCompanyId
} from "../controller/Company/opportunity.controller.js";

import { verifyToken, verifyCompanyOrAdmin } from "../middlewares/auth.js";

const router = express.Router();

/**
 *  Company/Provider Routes: Ordered by AUTH, OPP, Pay1st, Applicants, Pay2nd
 */

// AUTH
router.get("/", getOpportunities);
router.post("/signup", handleCompanySignUp);
router.post("/signin", handleCompanySignIn);
router.post("/logout", companyLogout);

// AUTH - middleware
router.use(verifyToken);

// AUTH - profile
router.get("/profile", getCompanyProfile);
router.put("/update-password", updateCompanyPassword);
router.put("/update-profile", updateCompanyProfile);


// OPPORTUNITY: for Company/Provider
router.post("/create", verifyCompanyOrAdmin, createOpportunity); // for comp
router.get("/myopportunities/:id", verifyCompanyOrAdmin, getOpportunityByCompanyId); // for showing in Company's Profile
///
router.get("/:id", getOpportunityById); // when click on an Opportunity, For User/Admin/Company : [COMMON]
///
router.put("/:id", verifyCompanyOrAdmin, updateOpportunity); // update single opp
router.put("/:id/close", verifyCompanyOrAdmin, closeOpportunity); // can close before deadline
router.delete("/:id", verifyCompanyOrAdmin, deleteOpportunity);
// router.post("/verify/opportunity", verifyCompanyOrAdmin, []); // for COMP // TODO: To verify 1/2 payment, [Razorpay- REQUIRED]

//////////////// TODO
// PAY-1st: for Company/Provider
   //1

// APPLICANT:
   //API:1
   //API:2

// PAY-2nd: for Company/Provider
   //1

export default router;