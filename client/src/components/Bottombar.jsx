import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPen, faUser } from '@fortawesome/free-solid-svg-icons';

const BottomBar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 flex justify-evenly items-center rounded-full">
    
    
    
    
      
      
      <a href="#" className="flex items-center justify-center">
        <FontAwesomeIcon icon={faHome} className="h-8" />
      </a>
     
     
      <a href="#" className="flex items-center justify-center">
        <FontAwesomeIcon icon={faPen} className="h-8" />
      </a>

      <a href="#" className="flex items-center justify-center">
        <FontAwesomeIcon icon={faUser} className="h-8" />
      </a>
    </div>
  );
};

export default BottomBar;
