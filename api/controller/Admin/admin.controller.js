// AUTH, []
// api 1: 
/**
 * To Login
 */


// VERIFY-PAYMENT, [verifyOpp/:OPPid]
// api 1: 
/**
 * @Needs oppid > companyid + payment proof (SS or payId)[RAZORPAY] + 1st-payment/2nd-Payment
 * @TODO  we change the firstpayment to True from False [MANUALLY]
 * @middleware to decide check if 1st-payment is done or not for 2nd
 */


// OPP, [getAllOpp] , [getAllOpp/COmpany/:companyId]
/** API 1:  [getAllOpp] - with filters
 * @Response get all users who are applicant
 */
/** API 2:  [getAllgetAllOpp/COmpany/:companyIdlOpp]
 * @Response same as API 1 of APPLICANT section of Company route
 */

// PAYMENT, [GetShortlisted], [PayToApplicants]
/** API 1:  [GetShortlisted]
 * @Needs applicant.status==selected + 2ndPayment of an Opp  || This will be in Company to send this data to Admin
 * @Response got
 */
/** API 2:  [PayToApplicants]
 * @Needs make sure 2nd payment done & get array of shortlisted applicant to pay them
 * @Response PaidToApplicant, {"payment-to-applicants": "paid"}
 */