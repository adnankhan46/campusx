import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Calendar, User, ChevronLeft, Clock, Users, BadgeCheck, Link as LinkIcon, FileText, Send, CheckCircle } from 'lucide-react';
import Navbar from '../../components/constants/Navbar';
import BottomBar from '../../components/constants/Bottombar';
import { MarkdownRenderer } from '../../components/constants/MarkdownRenderer';
import { useGetOpportunityByIdQuery, useApplyForOpportunityMutation, useGetMyApplicationQuery } from '../../redux/opportunities/opportunity-api';

// ─── Deadline Badge ──────────────────────────────────────────────────────────
const DeadlineBadge = ({ deadline }) => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diffDays = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return (
    <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-md font-medium">Expired</span>
  );
  if (diffDays <= 3) return (
    <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-md font-medium animate-pulse">{diffDays}d left</span>
  );
  if (diffDays <= 7) return (
    <span className="text-xs px-2 py-1 bg-amber-100 text-amber-600 rounded-md font-medium">{diffDays}d left</span>
  );
  return (
    <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-md font-medium">{diffDays}d left</span>
  );
};

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const styles = {
    open: 'bg-green-100 text-green-700 border-green-200',
    closed: 'bg-gray-100 text-gray-600 border-gray-200',
    filled: 'bg-blue-100 text-blue-700 border-blue-200',
    expired: 'bg-red-100 text-red-600 border-red-200',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${styles[status] || styles.closed}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// ─── Skeleton Loader ──────────────────────────────────────────────────────────
const OpportunityPageSkeleton = () => (
  <div className="animate-pulse space-y-4 w-full">
    <div className="h-6 bg-gray-200 rounded w-1/3" />
    <div className="h-9 bg-gray-200 rounded w-2/3" />
    <div className="flex gap-2">
      <div className="h-6 bg-gray-200 rounded w-16" />
      <div className="h-6 bg-gray-200 rounded w-16" />
    </div>
    <div className="h-px bg-gray-100 my-4" />
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
      <div className="h-4 bg-gray-200 rounded w-4/5" />
    </div>
    <div className="grid grid-cols-2 gap-4 mt-6">
      <div className="h-20 bg-gray-200 rounded-xl" />
      <div className="h-20 bg-gray-200 rounded-xl" />
      <div className="h-20 bg-gray-200 rounded-xl" />
      <div className="h-20 bg-gray-200 rounded-xl" />
    </div>
  </div>
);

// ─── Info Card ────────────────────────────────────────────────────────────────
const InfoCard = ({ icon: Icon, label, value, accent }) => (
  <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4">
    <div className={`p-2 rounded-lg ${accent || 'bg-[#6a7cff]/10'}`}>
      <Icon className="h-4 w-4 text-[#6a7cff]" />
    </div>
    <div>
      <p className="text-xs text-gray-400 font-inter">{label}</p>
      <p className="text-sm font-semibold text-gray-800 font-inter">{value}</p>
    </div>
  </div>
);

// ─── Already Applied Card ─────────────────────────────────────────────────────
const AlreadyAppliedCard = ({ status, application }) => {
  const statusStyles = {
    applied: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', dot: 'bg-blue-500' },
    shortlisted: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500' },
    selected: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', dot: 'bg-green-500' },
    rejected: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500' },
  };
  const s = statusStyles[status] || statusStyles.applied;

  return (
    <div className="bg-white border border-[#D9D9D9] rounded-xl p-5 space-y-4">
      {/* Status Card */}
      <div className={`flex items-center gap-3 p-4 rounded-xl border ${s.bg} ${s.border}`}>
        <CheckCircle className={`h-5 w-5 ${s.text}`} />
        <div>
          <p className={`text-sm font-semibold font-inter ${s.text}`}>Application Submitted</p>
          <p className={`text-xs font-inter ${s.text} opacity-80`}>
            Status: <span className="font-bold capitalize">{status}</span>
          </p>
        </div>
        <div className={`ml-auto h-2 w-2 rounded-full ${s.dot}`} />
      </div>

      {/* Submission Details */}
      {application && (
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-800 font-outfit">Your Submission</h3>
          
          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 font-inter mb-2">Cover Letter</label>
            <p className="text-sm text-gray-700 font-inter bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">
              {application.coverLetter || 'No cover letter provided'}
            </p>
          </div>

          {/* Proof of Work */}
          {(application.proofOfWork?.screenshot || application.proofOfWork?.link) && (
            <div className="border border-gray-100 rounded-xl p-4 bg-[#FAF4FE]/60 space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#6a7cff]" />
                <p className="text-sm font-semibold text-gray-700 font-inter">Proof of Work Submitted</p>
              </div>

              {application.proofOfWork.screenshot && (
                <div>
                  <p className="text-xs text-gray-500 font-inter mb-2">Screenshot URL</p>
                  <a href={application.proofOfWork.screenshot} target="_blank" rel="noopener noreferrer" className="text-[#6a7cff] hover:underline text-sm font-inter break-all">
                    {application.proofOfWork.screenshot}
                  </a>
                </div>
              )}

              {application.proofOfWork.link && (
                <div>
                  <p className="text-xs text-gray-500 font-inter mb-2">Work Link</p>
                  <a href={application.proofOfWork.link} target="_blank" rel="noopener noreferrer" className="text-[#6a7cff] hover:underline text-sm font-inter break-all">
                    {application.proofOfWork.link}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Apply Form ───────────────────────────────────────────────────────────────
const ApplyForm = ({ opportunityId, onSuccess }) => {
  const [form, setForm] = useState({ coverLetter: '', screenshotUrl: '', link: '' });
  const [errors, setErrors] = useState({});
  const [applyForOpportunity, { isLoading }] = useApplyForOpportunityMutation();

  const validate = () => {
    const errs = {};
    if (!form.coverLetter.trim()) errs.coverLetter = 'Cover letter is required';
    else if (form.coverLetter.trim().length < 20) errs.coverLetter = 'Please write at least 20 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (errors[name]) setErrors({ ...errors, [name]: '' });
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await applyForOpportunity({
        id: opportunityId,
        body: {
          coverLetter: form.coverLetter,
          proofOfWork: {
            screenshot: form.screenshotUrl || null,
            link: form.link || null,
          },
        },
      }).unwrap();
      onSuccess();
    } catch (err) {
      setErrors({ submit: err?.data?.message || 'Failed to submit application. Please try again.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Cover Letter */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 font-inter mb-1">
          Cover Letter <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-400 font-inter mb-2">
          Briefly explain why you are a good fit for this opportunity.
        </p>
        <textarea
          name="coverLetter"
          value={form.coverLetter}
          onChange={handleChange}
          rows={4}
          placeholder="Tell them about your relevant experience and why you want to do this..."
          className={`w-full p-3 border-2 rounded-xl text-sm font-inter focus:outline-none focus:border-[#6a7cff] resize-none transition-colors ${
            errors.coverLetter ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
          }`}
        />
        {errors.coverLetter && <p className="text-red-500 text-xs mt-1 font-inter">{errors.coverLetter}</p>}
      </div>

      {/* Proof of Work */}
      <div className="border border-gray-100 rounded-xl p-4 bg-[#FAF4FE]/60 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="h-4 w-4 text-[#6a7cff]" />
          <p className="text-sm font-semibold text-gray-700 font-inter">Proof of Work </p>
        </div>

        {/* Screenshot URL */}
        <div>
          <label className="block text-xs text-gray-500 font-inter mb-1">Screenshot URL</label>
          <input
            type="url"
            name="screenshotUrl"
            value={form.screenshotUrl}
            onChange={handleChange}
            placeholder="https://drive.google.com/..."
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-sm font-inter focus:outline-none focus:border-[#6a7cff] transition-colors"
          />
        </div>

        {/* Work Link */}
        <div>
          <label className="block text-xs text-gray-500 font-inter mb-1">Work Link</label>
          <input
            type="url"
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="https://github.com/... or https://figma.com/..."
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-sm font-inter focus:outline-none focus:border-[#6a7cff] transition-colors"
          />
        </div>
      </div>

      {errors.submit && (
        <p className="text-red-500 text-sm bg-red-50 p-3 rounded-xl font-inter">{errors.submit}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full flex items-center justify-center gap-2 p-3 rounded-xl font-semibold font-inter text-white transition-all ${
          isLoading ? 'bg-[#c9cfff] cursor-not-allowed' : 'bg-[#6a7cff] hover:bg-[#5a6be0]'
        }`}
      >
        <Send className="h-4 w-4" />
        {isLoading ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
function OpportunityPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [applied, setApplied] = useState(false);

  const { data, error, isLoading } = useGetOpportunityByIdQuery(id);
  const { data: myAppliedOpportunities, isLoading: applicationsLoading } = useGetMyApplicationQuery(
    { userId: currentUser?._id },
    { skip: !currentUser }
  );

  const opportunity = data?.data;

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const formattedDeadline = opportunity
    ? new Date(opportunity.deadline).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  const formattedPosted = opportunity
    ? new Date(opportunity.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

  const isExpiredOrClosed = opportunity && (opportunity.status === 'closed' || opportunity.status === 'expired' || new Date() > new Date(opportunity.deadline));
  
  // Check if user has applied to this specific opportunity
  const myAppInThisOpp = Array.isArray(myAppliedOpportunities) 
    ? myAppliedOpportunities.find(opp => String(opp._id) === String(id))?.applicants?.find(app => String(app.userId) === String(currentUser?._id)) 
    : null;
  
  const hasApplied = applied || !!myAppInThisOpp;
  const applicationStatus = myAppInThisOpp?.status || 'applied';

  const showForm = currentUser && !isExpiredOrClosed && !hasApplied;

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#FAF4FE] mb-[120px] font-inter">
      <Navbar />

      <div className="w-full max-w-2xl px-4 mt-4">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#6a7cff] transition-colors mb-4 font-inter"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Explore
        </button>

        {/* Loading State */}
        {isLoading && <OpportunityPageSkeleton />}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-inter text-sm">Failed to load opportunity. Please try again.</p>
            <button
              onClick={() => navigate('/explore')}
              className="mt-3 text-sm text-[#6a7cff] hover:underline font-inter"
            >
              Go back to Explore
            </button>
          </div>
        )}

        {/* Main Content */}
        {opportunity && !isLoading && (
          <div className="space-y-4">

            {/* Header Card */}
            <div className="bg-white border border-[#D9D9D9] rounded-xl p-5">
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-indigo-100 text-indigo-600 border border-indigo-200">
                  {opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1)}
                </span>
                <StatusBadge status={opportunity.status} />
                <DeadlineBadge deadline={opportunity.deadline} />
                {opportunity.isPaid && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
                    Paid
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-xl md:text-2xl font-bold font-outfit text-gray-900 mb-1">
                {opportunity.title}
              </h1>

              {/* Posted by */}
              <p className="text-sm text-gray-400 font-inter">
                Posted by <span className="font-semibold text-gray-600">{opportunity.createdBy.name}</span> · {formattedPosted}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3">
              <InfoCard
                icon={opportunity.amount === 0 ? BadgeCheck : Users}
                label="Reward"
                value={opportunity.amount === 0 ? '1000 AURA' : `₹ ${opportunity.amount.toLocaleString()}`}
              />
              <InfoCard
                icon={Users}
                label="Openings"
                value={`${opportunity.numberOfOpenings} position${opportunity.numberOfOpenings > 1 ? 's' : ''}`}
              />
              <InfoCard
                icon={Calendar}
                label="Deadline"
                value={formattedDeadline}
              />
              <InfoCard
                icon={User}
                label="Posted By"
                value={opportunity.createdBy.name}
              />
            </div>

            {/* Description Card */}
            <div className="bg-white border border-[#D9D9D9] rounded-xl p-5">
              <h2 className="text-base font-semibold text-gray-800 font-outfit mb-3">About This Opportunity</h2>
              <MarkdownRenderer
                content={opportunity.description}
                variant="full"
                className="font-inter text-gray-600 prose prose-sm max-w-none"
              />
            </div>

            {/* Proof of Work Instructions (if provided) */}
            {(opportunity.proofOfWork?.link || opportunity.proofOfWork?.screenshot) && (
              <div className="bg-[#FAF4FE] border border-indigo-100 rounded-xl p-5">
                <h2 className="text-base font-semibold text-gray-800 font-outfit mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#6a7cff]" />
                  Proof of Work Required
                </h2>
                {opportunity.proofOfWork.link && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-inter">
                    <LinkIcon className="h-3.5 w-3.5 text-[#6a7cff]" />
                    <a href={opportunity.proofOfWork.link} target="_blank" rel="noopener noreferrer"
                      className="text-[#6a7cff] hover:underline truncate">
                      {opportunity.proofOfWork.link}
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Closed / Expired Banner */}
            {isExpiredOrClosed && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
                <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 font-semibold font-inter text-sm">This opportunity is no longer accepting applications.</p>
                <p className="text-gray-400 text-xs font-inter mt-1">Deadline was {formattedDeadline}</p>
              </div>
            )}

            {/* Already Applied Status */}
            {!isExpiredOrClosed && hasApplied && (
              <AlreadyAppliedCard status={applicationStatus} application={myAppInThisOpp} />
            )}

            {/* Not Logged In */}
            {!currentUser && !isExpiredOrClosed && (
              <div className="bg-white border border-[#D9D9D9] rounded-xl p-5 text-center">
                <p className="text-gray-600 font-inter text-sm mb-3">You need to be logged in to apply.</p>
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-2 bg-[#6a7cff] text-white rounded-xl font-semibold font-inter text-sm hover:bg-[#5a6be0] transition-colors"
                >
                  Log In to Apply
                </button>
              </div>
            )}

            {/* Apply Form */}
            {showForm && (
              <div className="bg-white border border-[#D9D9D9] rounded-xl p-5">
                <h2 className="text-base font-semibold text-gray-800 font-outfit mb-1">Apply Now</h2>
                <p className="text-xs text-gray-400 font-inter mb-4">
                  Fill in the details below to submit your application.
                </p>
                <ApplyForm
                  opportunityId={id}
                  onSuccess={() => setApplied(true)}
                />
              </div>
            )}

          </div>
        )}
      </div>

      <BottomBar />
    </div>
  );
}

export default OpportunityPage;