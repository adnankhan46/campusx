import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPen, faUser, faPlus, faBell } from '@fortawesome/free-solid-svg-icons';
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
      case '/notification':
        return 'notification';
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
    <div className="fixed bottom-0 gap-2 w-full md:w-1/2 border-2 border-gray-500 bg-[#FAF4FE] bg-opacity-50 text-white p-2 flex justify-evenly items-center mx-auto backdrop-blur-sm">

      <div onClick={() => handleTabClick('home', '/home')} className="flex flex-col text-black items-center justify-center">
        <FontAwesomeIcon icon={faHome} className={`h-8 ${activeTab === 'home' ? 'text-[#6a7cff]' : 'text-gray-500'}`} />
      <p className={`text-xl ${activeTab === 'home' ? 'text-[#6a7cff]' : 'text-gray-500'}`}>Home</p>
      </div>
     
     
      <div onClick={() => handleTabClick('upload', '/upload')} className="flex flex-col text-black  items-center justify-center">
        <FontAwesomeIcon icon={faPlus} className={`h-8 ${activeTab === 'upload' ? 'text-[#6a7cff]' : 'text-gray-500'}`} />
        <p className={`text-xl ${activeTab === 'upload' ? 'text-[#6a7cff]' : 'text-gray-500'}`}>Upload</p>
        </div>

      <div onClick={() => handleTabClick('notification', '/notification')} className="flex flex-col text-black  items-center justify-center">
        <FontAwesomeIcon icon={faBell} className={`h-8 ${activeTab === 'notification' ? 'text-[#6a7cff]' : 'text-gray-500'}`} />
        <p className={`text-xl ${activeTab === 'notification' ? 'text-[#6a7cff]' : 'text-gray-500'}`}>Notification</p>
  </div>

      <div onClick={() => handleTabClick('profile', '/profile')} className="flex flex-col text-black  items-center justify-center">
        <FontAwesomeIcon icon={faUser} className={`h-6  ${activeTab === 'profile' ? 'text-[#6a7cff]' : 'text-gray-500'}`} />
        <p className={`text-xl ${activeTab === 'profile' ? 'text-[#6a7cff]' : 'text-gray-500'}`}>Profile</p>
        </div>
    </div>
  );
};

export default BottomBar;
