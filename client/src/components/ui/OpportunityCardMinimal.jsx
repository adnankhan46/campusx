import { Link } from "react-router-dom";

export const mockOpportunities = [
  {
    id: 1,
    title: "Design a Logo for Deshaw",
    amount: 1000,
    type: "UI/UX",
    status: "4",
    opening: "2",
    deadline: "2026-05-20",
    internal_bg: 0
  },
  {
    id: 2,
    title: "Research with professor",
    amount: 500,
    type: "Research",
    status: "open",
    opening: "2",
    deadline: "2026-06-01",
    internal_bg: 1
  },
  {
    id: 3,
    title: "Build a website for a Acme business",
    amount: 2500,
    type: "Development",
    opening: "5",
    deadline: "2026-04-30",
    internal_bg: 3
  }
];

// Minimal Opportunity Card Component
const OpportunityCardMinimal = ({ opportunity }) => {
  return (
    <div 
    style={{
          backgroundImage: `url("/backgrounds/bg-opp-${opportunity.internal_bg}.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
    className="group relative p-6 rounded-lg bg-white border border-gray-100/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#6a7cff]/5">
      <div className="flex flex-col h-full justify-between gap-4">
        <div>
          <div className="flex justify-between items-start mb-2">
            <span className={`text-xs px-2 py-1 bg-white/20 font-outfit rounded-sm  backdrop-blur-sm`}>
              {opportunity.type}
            </span>
            <span className="text-gray-500 text-xs">
              Due {new Date(opportunity.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#6a7cff] transition-colors line-clamp-2">
            {opportunity.title}
          </h3>
          <div className="flex mt-1">
            <span className="text-gray-500 text-xs">
              Opening: {opportunity.opening}
            </span>
          </div>
        </div>


        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="flex items-center gap-1.5 text-[#6a7cff]">
            <span className="font-semibold font-outfit">
              ₹ {opportunity.amount.toLocaleString()}
            </span>
          </div>

          <Link to={`/opportunities/${opportunity.id}`} className="bg-[#6a7cff] flex items-center gap-1 text-sm font-medium text-white group/btn py-2 px-4 rounded-sm">
            Apply
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCardMinimal;