import React, { useState } from 'react';
import axios from 'axios';
import BottomBar from '../components/Bottombar';
import Addposts from '../components/Addposts';
import Post from '../components/Post';

const UpdateProfile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:5000/login', { email, password });
      // Redirect or show success message
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4">
      <h1 className="text-2xl md:text-4xl font-bold  mb-4  rounded-full">Login</h1>
      <input className="w-full md:w-1/2 p-2 mb-2 border rounded-xl" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full md:w-1/2 p-2 mb-2 border rounded-xl" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="mt-4 p-2 bg-blue-500 text-white rounded " onClick={handleLogin}>UPDATE</button>
      <Post/>
      <BottomBar/>
    </div>
    
  )  
};

  

export default UpdateProfile;

