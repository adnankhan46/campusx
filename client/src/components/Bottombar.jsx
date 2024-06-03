import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPen, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const BottomBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentTab = () => {
    switch (location.pathname) {
      case '/home':
        return 'home';
      case '/profile':
        return 'profile';
      case '/upload':
        return 'upload';
      default:
        return '';
    }
  };

  const [activeTab, setActiveTab] = useState(getCurrentTab());

  useEffect(() => {
    setActiveTab(getCurrentTab());
  }, [location.pathname]);

  const handleTabClick = (tab, path) => {
    setActiveTab(tab);
    navigate(path);
  };
  return (
    <div className="fixed bottom-0 gap-2 w-full md:w-1/2 border-2 border-gray-500 bg-[#FAF4FE] bg-opacity-50 text-white p-4 flex justify-evenly items-center mx-auto backdrop-blur-sm">

      <div onClick={() => handleTabClick('home', '/home')} className="flex items-center justify-center">
        <FontAwesomeIcon icon={faHome} className={`h-8 ${activeTab === 'home' ? 'text-[#6a7cff]' : 'text-gray-500'}`} />
      </div>
     
     
      <div onClick={() => handleTabClick('upload', '/upload')} className="flex items-center justify-center">
        <FontAwesomeIcon icon={faPen} className={`h-8 ${activeTab === 'upload' ? 'text-[#6a7cff]' : 'text-gray-500'}`} />
      </div>

      <div onClick={() => handleTabClick('profile', '/profile')} className="flex items-center justify-center">
        <FontAwesomeIcon icon={faUser} className={`h-6  ${activeTab === 'profile' ? 'text-[#6a7cff]' : 'text-gray-500'}`} />
      </div>
    </div>
  );
};

export default BottomBar;
