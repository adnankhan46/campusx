import { useState } from "react";
import { Calendar, Users, Award, User, ChevronRight } from "lucide-react";

export function OpportunityCard({ opportunity }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const formattedDate = new Date(opportunity.deadline).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleCardClick = () => {
    const shouldShowApplicants = opportunity.paymentStatus.firstPayment.status === true || 
                                  opportunity.paymentStatus.firstPayment.status === null;
    
    if (shouldShowApplicants) {
      console.log(`Navigate to: /Dashboard/allApplicants/${opportunity._id}`);
    } else {
      console.log('Navigate to: /Dashboard/payments');
    }
  };

  return (
    <div
      className="mt-3 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden border border-gray-200 rounded-lg bg-white">
        {/* Card Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-outfit font-semibold text-gray-800 line-clamp-2 flex-1 pr-4">
              {opportunity.title}
            </h3>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-indigo-100 text-indigo-600 border border-indigo-200">
                {opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1)}
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${
                  opportunity.status === "open"
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-amber-100 text-amber-700 border-amber-200"
                }`}
              >
                {opportunity.status.charAt(0).toUpperCase() + opportunity.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="px-6 pb-2">
          <p className="mb-4 line-clamp-2 text-gray-600 font-inter">{opportunity.description}</p>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
              <span className="text-xs md:text-sm">
                Deadline: <span className="font-medium">{formattedDate}</span>
              </span>
            </div>

            <div className="flex items-center text-gray-600">
              <User className="h-4 w-4 mr-2 text-indigo-500" />
              <span className="text-xs md:text-sm">
                Posted by: <span className="font-medium">{opportunity.createdBy.name}</span>
              </span>
            </div>

          </div>
          
          <div className="flex items-center justify-between text-gray-600 text-xs mt-4">
            <span>
              Posted on{" "}
              {new Date(opportunity.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
             <span>
                Openings: <span className="font-medium">{opportunity.numberOfOpenings}</span>
              </span>
          </div>
        </div>
        

        {/* Card Footer */}
        
        <div className="flex justify-between items-center border-t bg-gray-50 p-4">
          
          <button
            onClick={handleCardClick}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-main bg-white border border-indigo-300 rounded-md hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-500 transition-colors duration-200"
          >
           
              <span>View</span>
           <ChevronRight
              className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                isHovered ? "translate-x-1" : ""
              }`}
            />
          </button>

          <div className="flex items-center gap-1 cursor-pointer bg-main text-white border border-main px-4 py-2 rounded-lg">
            <span className="text-md md:text-sm font-medium font-outfit">
              {opportunity.amount === 0 ? "1000 AURA" : `₹ ${opportunity.amount.toLocaleString()}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}