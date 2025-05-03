// api/model/applicant.model.js
import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  opportunityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opportunity',
    required: true
  },
  coverLetter: {
    type: String,
    required: true
  },
  proofOfWork: {
    screenshot: {
      type: String,
      default: null
    },
    link: {
      type: String,
      default: null
    }
  },
  status: {
    type: String,
    enum: ['applied', 'shortlisted', 'selected', 'rejected'],
    default: 'applied'
  },
  paymentStatus: {
    firstPayment: {
      status: {
        type: Boolean,
        default: false
      },
      date: {
        type: Date,
        default: null
      }
    },
    secondPayment: {
      status: {
        type: Boolean,
        default: false
      },
      date: {
        type: Date,
        default: null
      }
    }
  },
  completionStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Create indexes for efficient querying
applicantSchema.index({ userId: 1, opportunityId: 1 }, { unique: true });
applicantSchema.index({ opportunityId: 1, status: 1 });
applicantSchema.index({ userId: 1, status: 1 });

const Applicant = mongoose.model("Applicant", applicantSchema);

export default Applicant;