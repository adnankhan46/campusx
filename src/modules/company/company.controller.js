import { asyncHandler, ApiResponses } from '../../shared/utils/index.js';
import { companyService } from './company.service.js';

/**
 * Company Controller - HTTP request handlers
 * Thin layer that delegates to service layer
 */

/**
 * Handle company sign up
 * POST /api/company/signup
 */
export const handleCompanySignUp = asyncHandler(async (req, res) => {
  const { company, token } = await companyService.signUp(req.body);

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json(ApiResponses.created({ ...company, token }, 'Company account created successfully'));
});

/**
 * Handle company sign in
 * POST /api/company/signin
 */
export const handleCompanySignIn = asyncHandler(async (req, res) => {
  const { company, token } = await companyService.signIn(req.body);

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json(ApiResponses.success({ ...company, token }, 'Sign in successful'));
});

/**
 * Handle company logout
 * POST /api/company/logout
 */
export const companyLogout = asyncHandler(async (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json(ApiResponses.success(null, 'Logout successful'));
});

/**
 * Get company profile
 * GET /api/company/profile
 */
export const getCompanyProfile = asyncHandler(async (req, res) => {
  const company = await companyService.getProfile(req.user.id);
  res.status(200).json(ApiResponses.success(company));
});

/**
 * Update company password
 * PUT /api/company/update-password
 */
export const updateCompanyPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const result = await companyService.updatePassword(req.user.id, currentPassword, newPassword);
  res.status(200).json(ApiResponses.success(result, 'Password updated successfully'));
});

/**
 * Update company profile
 * PUT /api/company/update-profile
 */
export const updateCompanyProfile = asyncHandler(async (req, res) => {
  const company = await companyService.updateProfile(req.user.id, req.body);
  res.status(200).json(ApiResponses.success(company, 'Profile updated successfully'));
});

/**
 * Get applicants of a particular opportunity
 * GET /api/company/applicants/:id
 */
export const getMyApplicants = asyncHandler(async (req, res) => {
  const applicants = await companyService.getMyApplicants(req.params.id);
  res.status(200).json(ApiResponses.success(applicants));
});

/**
 * Update applicant status (applied → shortlisted/selected/rejected)
 * PUT /api/company/applicants/status/:opportunityId/:userId
 */
export const updateApplicantStatus = asyncHandler(async (req, res) => {
  const { opportunityId, userId } = req.params;
  const { status } = req.body;
  const opportunity = await companyService.updateApplicantStatus(opportunityId, userId, status, req.user);
  res.status(200).json(
    ApiResponses.success(
      { message: 'Applicant status updated successfully', opportunity },
      'Applicant status updated successfully'
    )
  );
});
