import React, { useState } from 'react';
import { useSelector } from 'react-redux';


const EditProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [password, setPassword] = useState('');

  const {currentUser} = useSelector((state)=> state.user)

  const handleUpdate = async () => {
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <img src={currentUser.profilePicture} className=' h-50 w-48' />
      <h1 className="text-2xl md:text-4xl font-bold mb-4">Edit Profile</h1>
      <input className="w-full md:w-1/2 p-2 mb-2 border rounded" type="text" placeholder="Username" value={currentUser.username} onChange={(e) => setUsername(e.target.value)} />
      <input className="w-full md:w-1/2 p-2 mb-2 border rounded" type="email" placeholder="Email" value={currentUser.email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full md:w-1/2 p-2 mb-2 border rounded" type="text" placeholder="Admission Number" value={currentUser.admissionNumber} onChange={(e) => setAdmissionNumber(e.target.value)} />
      <input className="w-full md:w-1/2 p-2 mb-2 border rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={handleUpdate}>Update</button>
      <button href="/Home" class="mt-4 p-2 bg-blue-500 text-white rounded"  aria-pressed="true">logout</button>
    </div>
  );
};

export default EditProfile;
