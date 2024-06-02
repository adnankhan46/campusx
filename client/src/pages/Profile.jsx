import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard';


const EditProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [password, setPassword] = useState('');

  const {currentUser} = useSelector((state)=> state.user)

  const handleUpdate = async () => {
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
    <div className='flex flex-col w-full items-center border-2 border-red-600'>
    <img src={currentUser.profilePicture} className=' h-50 w-48' />
    <h1 className="text-2xl md:text-4xl font-bold mb-4">{currentUser.admissionNumber}</h1>
    <input className="w-full md:w-1/2 p-2 mb-2 border rounded-xl bg-[#eeeeee]" type="text" placeholder="Username" value={currentUser.username} onChange={(e) => setUsername(e.target.value)} />
    <input className="w-full md:w-1/2 p-2 mb-2 border rounded-xl bg-[#eeeeee]" type="email" placeholder="Email" value={currentUser.email} onChange={(e) => setEmail(e.target.value)} />
    <input className="w-full md:w-1/2 p-2 mb-2 border rounded-xl bg-[#eeeeee]" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className='flex gap-6'>
      <button className="mt-4 p-3 bg-[#eeeeee] border-2 border-[#6a7cff] font-bold text-[#6a7cff] rounded-xl" onClick={handleUpdate}>Edit Profile</button>
      <button className="mt-4 p-3 bg-[#eeeeee] border-2 border-[#D9D9D9] text-[#6a7cff] font-bold rounded-2xl"  aria-pressed="true">Logout</button>
      </div>
      <div className="mt-4 border border-green-600 flex flex-col w-full md:w-1/2 items-center">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">My Posts</h1>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      </div>
      </div>
      </div>
  );
};

export default EditProfile;
