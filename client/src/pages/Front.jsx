import React, { useRef, useEffect } from 'react';
import Typed from 'typed.js';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandSparkles} from '@fortawesome/free-solid-svg-icons';
import CampusAIMockup from "../assets/campusai-mockup.png";

const Front = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (currentUser !== null) {
  //     navigate("/home");
  //   }
  // }, [currentUser, navigate]);

  const typedTextRef = useRef(null);
  const typedInstanceRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "For Developers, By Developers",
        "Say Good bye to Clone Projects by Real World Project Collaborations",
        "Build. Collaborate. Share Ideas",
        "RCB players are AI Generated?",
        "Try the New Campus AI Chat",
        "CampusX is the best thing that happened",
      ],
      typeSpeed: 10,
      smartBackspace: true,
      backDelay: 2000,
      startDelay: 1000,
      showCursor: true,
      loop: true,
    };

    if (typedTextRef.current) {
      typedInstanceRef.current = new Typed(typedTextRef.current, options);
    }

    return () => {
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
        typedInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="overflow-x-hidden bg-[#FAF4FE] h-screen scroll-smooth">
      <nav>
        <Navbar />
      </nav>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center p-3 md:px-64 gap-12 md:gap-10">
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
              <span className="text-base" ref={typedTextRef}></span>
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
          <div className="text-[#505153] text-base md:text-base font-inter font-light">Share what you Think</div>
          <div className="font-bold font-suse text-[#243CB6] text-3xl tracking-wider md:text-xl mb-4 mx-auto">
            Without Revealing <br /> your Identity
          </div>
          <Link to="/signup">
            <button className="register mb-2 p-2 font-poppins font-bold h-12 shadow-none border-0 bg-[#D9E5ED] text-lg rounded-xl w-full transition-all duration-300 cursor-pointer hover:bg-[#6a7cff] hover:text-white">
              Join Now
            </button>
          </Link>
          <Link to="/login">
            <button className="login p-2 mb-2 font-poppins font-bold h-12 shadow-none border-0 bg-[#6a7cff] text-white text-lg rounded-xl w-full transition-all duration-300 cursor-pointer hover:bg-white hover:text-[#6a7cff]">
              LogIN
            </button>
          </Link>
          
          <div class="relative p-[2px] rounded-md bg-gradient-to-r from-[#f6a1fff5] via-[#e886edf6] to-[#4b6cfcec]">
        <Link to="/campusai">
  <div class="flex justify-center items-center h-12 w-full bg-[#FAF4FE] rounded-md">
  <button className="login font-outfit p-2 font-poppins font-extrabold h-12 shadow-none bg-custom-gradient bg-clip-text text-transparent text-2xl rounded-xl w-full transition-all duration-300 cursor-pointer hover:bg-white hover:text-[#6a7cff]">
    Try CampusAI
  </button>
  </div>
</Link>
</div>
        </div>
      </div>
      {/**  Section 2    */}
      <div className="flex flex-col md:flex-row justify-center md:justify-between gap-10 mt-8 px-8 py-6 mx-4 md:mx-64 rounded-[24px] bg-[#6a7cff]">
       {/**  Section 2(a)    */}
      <div className='flex flex-col'>
      <p className='text-white text-4xl tracking-widest mb-2 font-semibold font-suse'>
      INTRODUCING
      </p>
      <p className=' text-white font-extrabold font-outfit flex items-center mt-3'>
      <FontAwesomeIcon icon={faWandSparkles} className='md:h-12 h-14 mx-2 text-white' />
      <span className='text-5xl' >
      CampusAI
      </span>
      </p>
      <p className='font-inter mt-10 text-white'>Ask Questions Regarding Campus or anything else comes to your mind
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus quis quia nulla?
      </p>
      </div>
       {/**  Section 2(b)    */}
      <img src={CampusAIMockup} alt="CampusAI Mockup" className='h-[36rem] md:h-[26rem] md:mt-2'/>
      </div>

      {/**  Section 2(1)    */}
      <div className="flex flex-col md:flex-row justify-center md:justify-between gap-10 mt-4 mb-8 px-8 py-6 mx-4 md:mx-64 rounded-[24px] bg-[#d06aff]">
       {/**  Section 2(1)(a)    */}
      <div className='flex flex-col'>
      <p className='text-white text-4xl mb-2 font-semibold font-suse'>
      Explore CampusX
      </p>
      <p className=' text-white font-inter flex flex-col mt-3'>
     
      <span className='text-5xl font-extrabold font-outfit' >
      CampusX
      </span>
      <span className='font-inter mt-4'>
      Anonymous Social Networking Site specially for first year students to get introduced. CampusX also provides Economic Opportunites for students
      </span>
      </p>
      </div>
       {/**  Section 2(1)(b)    */}
       <img src={CampusAIMockup} alt="CampusAI Mockup" className='h-[36rem] md:h-[26rem] md:mt-2'/>
      </div>

       {/**  Footer will Come here    */}
       <Footer/>
    </div>
  );
};

export default Front;
