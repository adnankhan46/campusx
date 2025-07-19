import Opportunity from "../../model/opportunity.model.js";
import Applicant from "../../model/applicant.model.js"; // Add this import
import { errorHandler } from "../../middlewares/error.js";

export const applyForOpportunity = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (req.user.isCompany === true) {
      return next(errorHandler(403, "Companies cannot apply for opportunities"));
    }
    
    const opportunity = await Opportunity.findById(id);
    
    if (!opportunity) {
      return next(errorHandler(404, "Opportunity not found"));
    }
    
    // Check if opportunity is open
    if (opportunity.status !== 'open') {
      return next(errorHandler(400, "This opportunity is no longer accepting applications"));
    }
    
    // Check if deadline has passed
    if (new Date() > new Date(opportunity.deadline)) {
      opportunity.status = 'expired';
      await opportunity.save();
      return next(errorHandler(400, "Application deadline has passed"));
    }
    
    // Check if user has already applied
    const alreadyApplied = opportunity.applicants.find(
      applicant => applicant.userId.toString() === req.user.id
    );
    
    if (alreadyApplied) {
      return next(errorHandler(400, "You have already applied for this opportunity"));
    }

    // Extract proof of work from request body
    const { coverLetter, proofOfWork } = req.body;
    
    // Create an applicant record in the Applicant collection
    const newApplicant = new Applicant({
      userId: req.user.id,
      opportunityId: id,
      coverLetter: coverLetter || "No cover letter provided",
      proofOfWork: {
        screenshot: proofOfWork?.screenshot || null,
        link: proofOfWork?.link || null
      },
      status: 'applied'
    });
    
    await newApplicant.save();
    
    // Add user to applicants list in opportunity
    opportunity.applicants.push({
      userId: req.user.id,
      status: 'applied',
      appliedAt: new Date()
    });
    
    await opportunity.save();
    
    res.status(200).json({ 
      message: "Application submitted successfully",
      application: newApplicant
    });
  } catch (error) {
    next(error);
  }
};


// Update applicant status (for companies/admins)
export const updateApplicantStatus = async (req, res, next) => {
  try {
    const { opportunityId, userId } = req.params;
    const { status } = req.body;
    
    // Validate status
    if (!['applied', 'shortlisted', 'selected', 'rejected'].includes(status)) {
      return next(errorHandler(400, "Invalid status"));
    }
    
    const opportunity = await Opportunity.findById(opportunityId);
    
    if (!opportunity) {
      return next(errorHandler(404, "Opportunity not found"));
    }
    
    // Check if the user is authorized
    if (
      opportunity.createdBy.id.toString() !== req.user.id && 
      !req.user.isAdmin
    ) {
      return next(errorHandler(403, "You are not authorized to update applicant status"));
    }
    
    // Find the applicant
    const applicantIndex = opportunity.applicants.findIndex(
      applicant => applicant.userId.toString() === userId
    );
    
    if (applicantIndex === -1) {
      return next(errorHandler(404, "Applicant not found"));
    }
    
    // Update applicant status
    opportunity.applicants[applicantIndex].status = status;
    
    // If selected, add to selectedCandidates if not already there
    if (status === 'selected') {
      const alreadySelected = opportunity.selectedCandidates.find(
        candidate => candidate.userId.toString() === userId
      );
      
      if (!alreadySelected) {
        opportunity.selectedCandidates.push({
          userId,
          paymentStatus: {
            firstPayment: { status: false, date: null },
            secondPayment: { status: false, date: null }
          },
          completionStatus: 'pending'
        });
      }
    }
    
    await opportunity.save();
    
    res.status(200).json({ 
      message: "Applicant status updated successfully",
      opportunity
    });
  } catch (error) {
    next(error);
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res, next) => {
  try {
    const { opportunityId, userId } = req.params;
    const { paymentType, status } = req.body;
    
    // Validate payment type
    if (!['firstPayment', 'secondPayment'].includes(paymentType)) {
      return next(errorHandler(400, "Invalid payment type"));
    }
    
    const opportunity = await Opportunity.findById(opportunityId);
    
    if (!opportunity) {
      return next(errorHandler(404, "Opportunity not found"));
    }
    
    // Check if the user is authorized
    if (
      opportunity.createdBy.id.toString() !== req.user.id && 
      !req.user.isAdmin
    ) {
      return next(errorHandler(403, "You are not authorized to update payment status"));
    }
    
    // Find the selected candidate
    const candidateIndex = opportunity.selectedCandidates.findIndex(
      candidate => candidate.userId.toString() === userId
    );
    
    if (candidateIndex === -1) {
      return next(errorHandler(404, "Selected candidate not found"));
    }
    
    // Update payment status
    opportunity.selectedCandidates[candidateIndex].paymentStatus[paymentType].status = status;
    opportunity.selectedCandidates[candidateIndex].paymentStatus[paymentType].date = status ? new Date() : null;
    
    await opportunity.save();
    
    res.status(200).json({ 
      message: "Payment status updated successfully",
      opportunity
    });
  } catch (error) {
    next(error);
  }
};

// Get opportunities a user has applied for
export const getMyAppliedOpp = async (req, res, next) => {
  /* Algo:
        //1: Get user Id from Params
        //2: FindAll Opp. Now sort by this applicants[0].userId === this id
        //3: Return Opp.
  */
  try {
    // Only for regular users
    if (req.user.isCompany) {
      return next(errorHandler(403, "Companies cannot have applications"));
    }
    
    const { 
      status, 
      page = 1, 
      limit = 10 
    } = req.query;
    
    let query = {
      'applicants.userId': req.user.id
    };
    
    // Filter by application status if provided
    if (status) {
      query['applicants.status'] = status;
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Find opportunities where user has applied
    const opportunities = await Opportunity.find(query)
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count for pagination
    const totalCount = await Opportunity.countDocuments(query);
    
    // Format the response to include application status for the user
    const formattedOpportunities = opportunities.map(opp => {
      const application = opp.applicants.find(
        app => app.userId.toString() === req.user.id
      );
      
      return {
        ...opp._doc,
        myApplication: {
          status: application.status,
          appliedAt: application.appliedAt
        }
      };
    });
    
    res.status(200).json({
      applications: formattedOpportunities,
      totalPages: Math.ceil(totalCount / parseInt(limit)),
      currentPage: parseInt(page),
      totalCount
    });
  } catch (error) {
    next(error);
  }
};

// Get opportunities created by current company/user
export const getMyOpportunities = async (req, res, next) => {
  try {
    const { 
      status, 
      type,
      page = 1, 
      limit = 10,
      sort = '-createdAt' 
    } = req.query;
    
    const query = {
      'createdBy.id': req.user.id
    };
    
    // Apply filters if provided
    if (status) query.status = status;
    if (type) query.type = type;
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Execute query with pagination and sorting
    const opportunities = await Opportunity.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count for pagination
    const totalCount = await Opportunity.countDocuments(query);
    
    res.status(200).json({
      opportunities,
      totalPages: Math.ceil(totalCount / parseInt(limit)),
      currentPage: parseInt(page),
      totalCount
    });
  } catch (error) {
    next(error);
  }
};

