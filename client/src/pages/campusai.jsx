import React from 'react';
import Navbar from '../components/Navbar';
import BottomBar from '../components/Bottombar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import Chatbox from '../components/chatbox';

function CampusAi() {
  return (
    <div className='flex flex-col h-screen bg-white'>
      <div className="sticky top-0 z-200">
        <Navbar />
      </div>
    
      <p className="text-2xl md:text-4xl font-bold my-2 text-center">
        <FontAwesomeIcon icon={faWandSparkles} className='md:h-8 h-6 mx-2 text-[#6a7cff]' />
        CampusAI
      </p>
   
       
          <div className='flex-1 overscroll-y-auto  h-05 pb-20'>
            <Chatbox />
          </div>
         

      <div className='fixed bottom-0 w-full'>
        <BottomBar />
      </div>
    </div>
  );
}

export default CampusAi;
