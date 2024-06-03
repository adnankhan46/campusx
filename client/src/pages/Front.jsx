import React, { useRef, useEffect } from 'react';
import Typed from 'typed.js';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Front = () => {
  const navigate = useNavigate();

  const {currentUser} = useSelector((state)=> state.user);
  useEffect(() => {
    if (currentUser !== null){
      navigate("/home");
    }

  }, []);
  
  const typedTextRef = useRef(null);
  const typedInstanceRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: ["For Developers, By Developers",
              "Say Good Bye to Clone Projects by Real World Project Collaborations",
              "Build. Collaborate. Share Ideas",
              "RCB players are AI Generated ?",
              "CampusX is the best thing that happend",
      ],
      typeSpeed: 50,
      smartBackspace: true,
      backDelay: 2500,
      startDelay: 1000,
      showCursor: true,
      loop: true 
      
    };

    if (typedTextRef.current) {
      typedInstanceRef.current = new Typed(typedTextRef.current, options);
    }

    // Cleanup
    return () => {
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="overflow-x-hidden bg-[#FAF4FE] h-screen">
      <nav>
        <Navbar />
      </nav>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center p-3 md:px-64 gap-20 md:gap-10">
        <div className="flex flex-col">
          <div className="bg-box1-gradient flex flex-col h-[135px] rounded-[23px] p-3 relative mt-[26px] mx-12 transition-all duration-1000 md:hover:translate-x-10">
            <div className="font-poppins font-light text-white text-sm">
              <p className="text-base">
                Share your thoughts Anonymously with{' '}
                <span className="font-bold text-white">No Strings Attach</span>
              </p>
            </div>
            <div className="flex gap-2 items-center font-poppins font-light text-sm text-white absolute bottom-1.5 left-3">
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
          <div className="bg-box2-gradient flex flex-col h-[135px] w-50 rounded-[23px] p-3 relative mt-4 mx-12 right-8 transition-all duration-1000 md:hover:translate-x-10">
            <div className="font-poppins font-light text-white text-sm">
              <p className="text-base" ref={typedTextRef}></p>
            </div>
            <div className="flex gap-2 items-center font-poppins font-light text-sm text-white absolute bottom-1.5 left-3">
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
        <div className="flex flex-col relative mx-auto">
          <div className="text-[#505153] text-sm md:text-base">Share what you Think</div>
          <div className="font-bold text-[#243CB6] text-3xl tracking-wider md:text-xl mb-4 mx-auto">
            Without Revealing <br /> your Identity
          </div>
          <Link to="/signup">
            <button className="register mb-2 p-2 font-poppins font-bold h-12 shadow-none border-0 bg-[#D9E5ED] text-lg rounded-xl w-full transition-all duration-300 cursor-pointer hover:bg-[#6a7cff] hover:text-white">
              Join Now
            </button>
          </Link>
          <Link to="/login">
            <button className="login p-2 font-poppins font-bold h-12 shadow-none border-0 bg-[#6a7cff] text-white text-lg rounded-xl w-full transition-all duration-300 cursor-pointer hover:bg-white hover:text-[#6a7cff]">
              LogIN
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Front;
