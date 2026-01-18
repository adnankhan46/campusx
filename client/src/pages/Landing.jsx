import { useRef, useEffect, useState } from 'react';
import Typed from 'typed.js';
import Navbar from '../components/constants/Navbar';
import { Link } from 'react-router-dom';
import Footer from '../components/constants/Footer';
import OpportunityCardMinimal, { mockOpportunities } from '../components/ui/OpportunityCardMinimal';

const Front = () => {
  const typedTextRef = useRef(null);
  const typedInstanceRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "For Developers, By Developers",
        "Real tasks. Real money",
        "Say Good bye to Clone Projects by working in Real World Projects",
        "Build. Collaborate. Earn. Share Ideas",
        "Get paid for micro tasks",
        "BeCampusX is the best thing that happened",
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
    <div className="overflow-x-hidden bg-[#FAF4FE] h-screen scroll-smooth font-inter">
      <nav>
        <Navbar />
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row md:justify-between md:items-center p-3 md:px-64 gap-12 md:gap-10">
        <div className="flex flex-col">
          <div className="bg-box1-gradient md:min-w-[400px] flex flex-col h-[135px] rounded-[23px] p-3 relative mt-[26px] mx-12 transition-all duration-1000 md:hover:translate-x-10">
            <div className="font-poppins font-light text-white text-sm">
              <p className="text-base font-inter">
                Found my first paid gig here <br />
                <span className="font-bold text-white font-suse">BeCampusx is real</span>
              </p>
            </div>
            <div className="flex gap-2 items-center font-poppins font-light text-sm text-white absolute bottom-1.5 left-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
              </svg>
              <span className='font-inter'>Female From CSE</span>
            </div>
          </div>
          <div className="bg-box2-gradient flex flex-col h-[135px] w-50 rounded-[23px] p-3 relative mt-4 mx-12 right-8 transition-all duration-1000 md:hover:translate-x-10">
            <div className="font-poppins font-light text-white text-sm">
              <span className="text-base font-inter" ref={typedTextRef}></span>
            </div>
            <div className="flex gap-2 items-center font-poppins font-light text-sm text-white absolute bottom-1.5 left-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
              </svg>
              <span className='font-inter'>Male From ETC</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col relative mx-auto">
          <div className="text-[#505153] text-base md:text-base font-inter font-light">Micro tasks. Big opportunities</div>
          <div className="font-bold font-suse text-[#243CB6] text-3xl tracking-wid md:text-xl mb-4 mx-auto">
            Find Real Opportunities <br /> For Real Growth
          </div>
          <Link to="/signup">
            <button className="register mb-2 p-2 font-inter font-bold h-12 shadow-none border-0 bg-[#D9E5ED] text-lg rounded-xl w-full transition-all duration-300 cursor-pointer hover:bg-[#6a7cff] hover:text-white">
              Join Now
            </button>
          </Link>
          <Link to="/login">
            <button className="login p-2 mb-2 font-inter font-bold h-12 shadow-none border-0 bg-[#6a7cff] text-white text-lg rounded-xl w-full transition-all duration-300 cursor-pointer hover:bg-white hover:text-[#6a7cff]">
              LogIN
            </button>
          </Link>

          <div className="relative p-[2px] rounded-md bg-gradient-to-r from-[#f6a1fff5] via-[#e886edf6] to-[#4b6cfcec]">
            <Link to="/explore">
              <div className="flex justify-center items-center h-12 w-full bg-[#FAF4FE] rounded-md">
                <button className="login font-outfit p-2 font-extrabold h-12 shadow-none bg-custom-gradient bg-clip-text text-transparent text-2xl rounded-xl w-full transition-all duration-300 cursor-pointer hover:bg-white hover:text-[#6a7cff]">
                  Explore
                </button>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="relative py-16 overflow-hidden mx-4 md:mx-64 rounded-2xl mb-12 mt-6 bg-white/50 border border-white/60 shadow-sm backdrop-blur-sm ring-1 ring-black/10">

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6a7cff]/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 px-6 md:px-12">

          {/* Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-10 gap-6 text-center md:text-left">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-suse">
                Incentivized <span className="text-[#6a7cff]">Opportunities</span>
              </h2>
              <p className="text-gray-500 max-w-lg text-sm md:text-base">
                Explore freelance gigs, design projects, research projects, development projects, and other programs
              </p>
            </div>

            <Link to="/opportunities" className="group flex items-center gap-2 text-[#6a7cff] font-medium hover:text-[#5a6be0] transition-colors px-6 py-3 rounded-sm border border-[#6a7cff]/50">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockOpportunities.map((opportunity) => (
              <OpportunityCardMinimal key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>

        </div>
      </section>

      {/**  Section 3 - CampusX */}
      <section
        className="relative flex flex-col md:flex-row justify-center md:justify-between gap-10 mt-4 mb-8 px-8 py-6 mx-4 md:mx-64 rounded-[24px] overflow-hidden"
        style={{
          backgroundImage: "url('/backgrounds/bg-1.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Background overlay - opacity */}
        <div className="absolute inset-0 bg-black/30 rounded-[24px]" />

        {/* Content wrapper with relative positioning */}
        <div className="relative z-10 flex flex-col w-full">
          <div className="text-white font-inter flex flex-col">

            <div className='flex justify-between'>
              <p className="text-5xl font-extrabold font-outfit">
                CampusX
              </p>
              {/* <p className="mt-3 text-white text-4xl mb-2 font-semibold font-suse">
            Explore CampusX
          </p> */}
            </div>
            <p className="font-inter mt-4">
              Anonymous Social Web along with <span className="bg-white/20 rounded-sm px-1 font-outfit">Economic Opportunities</span> for students
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Front;
