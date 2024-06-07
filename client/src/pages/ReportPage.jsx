import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const ReportPage = () => {
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    if (admissionNumber.trim() !== '' && email.trim() !== '' && query.trim() !== '') {
      console.log({
        admissionNumber,
        email,
        query
      });
      
      setAdmissionNumber('');
      setEmail('');
      setQuery('');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white mb-32">
      <Navbar />
      <div className="flex flex-col w-full items-center p-4">
        <div className="bg-[#f0f4f8] w-full p-4 mb-4 rounded-lg shadow-md">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center">Report Page</h1>
        </div>
        <div className="w-full md:w-1/2 p-6 bg-[#eeeeee] rounded-xl shadow-lg">
          <input
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Admission Number"
            value={admissionNumber}
            onChange={(e) => setAdmissionNumber(e.target.value)}
          />
          <input
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows="4"
          ></textarea>
          <button
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={handleSubmit}
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
