 import mongoose from "mongoose";
import Opportunity from "../../model/opportunity.model.js";
import Company from "../../model/company.model.js";
import User from "../../model/user.model.js";
import { errorHandler } from "../../middlewares/error.js";
// Create a new opportunity
export const createOpportunity = async (req, res, next) => {
  try {
    const { title, description, numberOfOpenings, isPaid, amount, deadline, proofOfWork, type } = req.body;

    // Validate required fields
    if (!title || !description || !numberOfOpenings || isPaid === undefined || !deadline || !type) {
      return next(errorHandler(400, "Please provide all required fields"));
    }

    // Validate amount if isPaid is true
    if (isPaid && (!amount || amount <= 0)) {
      return next(errorHandler(400, "Please provide a valid amount for paid opportunity"));
    }

    // Validate deadline is in the future
    const deadlineDate = new Date(deadline);
    if (deadlineDate <= new Date()) {
      return next(errorHandler(400, "Deadline must be in the future"));
    }

    let creatorModel;
    let creatorName;

    // Determine if creator is company or user
    if (req.user.isCompany) {
      creatorModel = await Company.findById(req.user.id);
      if (!creatorModel) {
        return next(errorHandler(404, "Company not found"));
      }
      creatorName = creatorModel.name;
    } else if (req.user.isAdmin) {
      creatorModel = await User.findById(req.user.id);
      if (!creatorModel) {
        return next(errorHandler(404, "User not found"));
      }
      creatorName = creatorModel.username;
    } else {
      return next(errorHandler(403, "Only companies or admins can create opportunities"));
    }

    const newOpportunity = new Opportunity({
      title,
      description,
      numberOfOpenings,
      isPaid,
      amount: isPaid ? amount : 0,
      deadline: deadlineDate,
      proofOfWork: proofOfWork || { screenshot: null, link: null },
      type,
      status: 'open',
      creator: req.user.isCompany ? 'company' : 'user',
      createdBy: {
        id: req.user.id,
        name: creatorName
      }
    });

    const savedOpportunity = await newOpportunity.save();
    res.status(201).json(savedOpportunity);
  } catch (error) {
    next(error);
  }
};

// Get all opportunities (with filters)
export const getOpportunities = async (req, res, next) => {
  try {
    console.log("Starting getOpportunities");
    const { status, type, isPaid, creator, page = 1, limit = 10, sort = '-createdAt' } = req.query;

    // Validate and convert pagination parameters
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    console.log(`Pagination: page=${pageNum}, limit=${limitNum}, skip=${skip}`);

    // Build query object
    const query = {};
    if (status) query.status = status;
    if (type) query.type = type;
    if (isPaid !== undefined) query.isPaid = isPaid === 'true';
    if (creator) query.creator = creator;

    console.log("Query filters:", JSON.stringify(query));

    // First get total count for pagination info (not affected by pre-find middleware)
    const totalCount = await Opportunity.countDocuments(query);
    console.log(`Total count: ${totalCount}`);

    // Get raw data from MongoDB to check what's in the database
    const db = mongoose.connection.db;
    const opportunitiesCollection = db.collection('opportunities');
    const rawOpportunities = await opportunitiesCollection.find(query).toArray();
    console.log(`Raw MongoDB documents: ${rawOpportunities.length}`);
    
    if (rawOpportunities.length > 0) {
      console.log("First raw opportunity:", JSON.stringify(rawOpportunities[0]._id));
    }

    // Try with explicit find that avoids pre-find middleware
    const opportunities = await Opportunity.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .setOptions({ skipMiddleware: true }); // Try to bypass middleware if possible
    
    console.log(`Retrieved ${opportunities.length} opportunities with middleware bypass attempt`);
    
    // If still empty, try with a direct aggregation
    if (opportunities.length === 0) {
      console.log("Attempting direct aggregation...");
      const aggregateResults = await Opportunity.aggregate([
        { $match: query },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limitNum }
      ]);
      
      console.log(`Aggregation returned ${aggregateResults.length} results`);
      
      if (aggregateResults.length > 0) {
        console.log("Using aggregation results");
        // Return the aggregation results
        res.status(200).json({
          opportunities: aggregateResults,
          totalPages: Math.ceil(totalCount / limitNum),
          currentPage: pageNum,
          totalCount
        });
        return;
      }
    }
    
    // If we get here, use whatever the find returned (even if empty)
    const opportunitiesData = opportunities.map(opp => {
      return opp.toObject({ virtuals: true });
    });
    
    // Send response
    res.status(200).json({
      opportunities: opportunitiesData,
      totalPages: Math.ceil(totalCount / limitNum),
      currentPage: pageNum,
      totalCount
    });
    
    console.log("Response sent successfully");
  } catch (error) {
    console.error("Error in getOpportunities:", error);
    next(error);
  }
};
// Get opportunity by ID
export const getOpportunityById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const opportunity = await Opportunity.findById(id);
    
    if (!opportunity) {
      return next(errorHandler(404, "Opportunity not found"));
    }
    
    res.status(200).json(opportunity);
  } catch (error) {
    next(error);
  }
};

// Update opportunity
export const updateOpportunity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Find opportunity
    const opportunity = await Opportunity.findById(id);
    
    if (!opportunity) {
      return next(errorHandler(404, "Opportunity not found"));
    }
    
    // Check if the user is authorized to update this opportunity
    if (
      opportunity.createdBy.id.toString() !== req.user.id && 
      !req.user.isAdmin
    ) {
      return next(errorHandler(403, "You are not authorized to update this opportunity"));
    }
    
    // Validate deadline if provided
    if (updates.deadline) {
      const deadlineDate = new Date(updates.deadline);
      if (deadlineDate <= new Date()) {
        return next(errorHandler(400, "Deadline must be in the future"));
      }
      updates.deadline = deadlineDate;
    }
    
    // Validate amount if isPaid is updated to true
    if (updates.isPaid === true && (!updates.amount || updates.amount <= 0)) {
      return next(errorHandler(400, "Please provide a valid amount for paid opportunity"));
    }
    
    const updatedOpportunity = await Opportunity.findByIdAndUpdate(
      id, 
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    res.status(200).json(updatedOpportunity);
  } catch (error) {
    next(error);
  }
};

// Delete opportunity
export const deleteOpportunity = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const opportunity = await Opportunity.findById(id);
    
    if (!opportunity) {
      return next(errorHandler(404, "Opportunity not found"));
    }
    
    // Check if the user is authorized to delete this opportunity
    if (
      opportunity.createdBy.id.toString() !== req.user.id && 
      !req.user.isAdmin
    ) {
      return next(errorHandler(403, "You are not authorized to delete this opportunity"));
    }
    
    await Opportunity.findByIdAndDelete(id);
    
    res.status(200).json({ message: "Opportunity deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Close opportunity
export const closeOpportunity = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const opportunity = await Opportunity.findById(id);
    
    if (!opportunity) {
      return next(errorHandler(404, "Opportunity not found"));
    }
    
    // Check if the user is authorized to close this opportunity
    if (
      opportunity.createdBy.id.toString() !== req.user.id && 
      !req.user.isAdmin
    ) {
      return next(errorHandler(403, "You are not authorized to close this opportunity"));
    }
    
    opportunity.status = 'closed';
    await opportunity.save();
    
    res.status(200).json({ message: "Opportunity closed successfully", opportunity });
  } catch (error) {
    next(error);
  }
};

// Apply for an opportunity (for users)
export const applyForOpportunity = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Only regular users can apply, not companies
    if (req.user.isCompany) {
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
    
    // Add user to applicants
    opportunity.applicants.push({
      userId: req.user.id,
      status: 'applied',
      appliedAt: new Date()
    });
    
    await opportunity.save();
    
    res.status(200).json({ message: "Application submitted successfully" });
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

// Get opportunities a user has applied for
export const getMyApplications = async (req, res, next) => {
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