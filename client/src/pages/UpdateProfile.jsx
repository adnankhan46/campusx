import React, { useState } from 'react';
import axios from 'axios';
import BottomBar from '../components/Bottombar';
import PostCard from '../components/PostCard';

const UpdateProfile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUpdateUser = async () => {
    
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4">
    <div className='flex flex-col w-full items-center border border-red-600'>
    <h1 className="text-2xl md:text-4xl font-bold  mb-4  rounded-full">Update Profile</h1>
    <input className="w-full md:w-1/2 p-2 mb-2 border rounded-xl" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
    <input className="w-full md:w-1/2 p-2 mb-2 border rounded-xl" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    <button className="mt-4 p-2 bg-blue-500 text-white rounded ">UPDATE</button>

    </div>
    </div>
    
  )  
};

  

export default UpdateProfile;

