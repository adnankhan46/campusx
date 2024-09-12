import React from 'react';
import { useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandSparkles } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const location = useLocation();
  return (
    <>
    <div className='flex w-full h-16 bg-custom-gradient'>
    <div className='flex items-center h-16'>
    <h1 className="text-4xl font-bold font-outfit text-white ml-4">
    {(location.pathname === `/campusai`) ? "CampusAI" : "CampusX"}
    </h1>
    {(location.pathname === `/campusai`) &&
    <FontAwesomeIcon icon={faWandSparkles} className='md:h-8 h-6 mx-2 text-white' />
    }
    <span className='text-sm text-white font-bold'>
    {(location.pathname === `/campusai`) ? "By CampusX" : "BITD"}
    </span>
    </div>
    </div>
    </>
  )
}

export default Navbar;
