import React from 'react';

const Front = () => {
  return (
    <div className="overflow-x-hidden">
      <nav>
       
       
      </nav>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center p-3 md:px-64">
       
       
        <div className="flex flex-col">
         
         
          <div className="bg-[#D9E5ED] flex flex-col h-28 w-76 rounded-[23px] p-3 relative mt-3 transition-all duration-1000 hover:translate-x-10">
            <div className="font-poppins font-light text-[#174D77] text-sm">
              <p className="text-base">
                Share your thoughts Anonymously with{' '}
                <span className="font-bold text-[#259FFF]">No Strings Attach</span>
              </p>
            </div>
            <div className="flex gap-2 items-center font-poppins font-light text-sm text-[#259FFF] absolute bottom-1.5 left-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
              <span>Male From Section H</span>
            </div>
          </div>
          
          
          <div className="bg-[#D9E5ED] flex flex-col h-28 w-76 rounded-[23px] p-3 relative mt-5 transition-all duration-1000 ml-[-14rem] hover:translate-x-10">
            <div className="font-poppins font-light text-[#174D77] text-sm">
              <p className="text-base">Five Secret Places in our Campus</p>
            </div>
            <div className="flex gap-2 items-center font-poppins font-light text-sm text-[#259FFF] absolute bottom-1.5 left-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
              <span>Female From Section F</span>
            </div>
          </div>
        </div>
        
        
        <div className="flex flex-col relative md:right-32">
          <div className="text-[#174D77] text-sm md:text-base">Share what you Think</div>
          <div className="font-bold text-[#259FFF] text-lg md:text-xl mb-2">
            Without Revealing your Identity
          </div>
          <button className="register mb-2 p-2 font-poppins shadow-none border-0 bg-[#D9E5ED] text-lg rounded-[16px] transition-all duration-300 cursor-pointer hover:bg-[#259FFF] hover:text-white">
            Join Now
          </button>
          <button className="login p-2 font-poppins shadow-none border-0 bg-[#259FFF] text-white text-lg rounded-[16px] transition-all duration-300 cursor-pointer hover:bg-white hover:text-[#259FFF]">
            LogIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Front;
