import React, { useState } from 'react';
import axios from 'axios';

const Editprofile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleUpdate = async () => {
    try {
      await axios.put('http://localhost:5000/profile', { username, email, admissionNumber, password });
      // Clear inputs or show success message
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">Edit Profile</h1>
      <input className="w-full md:w-1/2 p-2 mb-2 border rounded" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input className="w-full md:w-1/2 p-2 mb-2 border rounded" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full md:w-1/2 p-2 mb-2 border rounded" type="text" placeholder="Admission Number" value={admissionNumber} onChange={(e) => setAdmissionNumber(e.target.value)} />
      <input className="w-full md:w-1/2 p-2 mb-2 border rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={handleUpdate}>Update</button>
      <button href="/Home" class="mt-4 p-2 bg-blue-500 text-white rounded"  aria-pressed="true">logout</button>
    </div>
  );
};

export default Editprofile;
