// src/components/Register.js
import React, { useState } from 'react';

const Register = () => {
  const [section, setSection] = useState('');
  const [gender, setGender] = useState('');

  const handleSectionChange = (event) => {
    setSection(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 to-yellow-200">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <span>
            Already have an account? <a href="login" className="text-blue-500">Sign In</a>
          </span>
        </div>
        <div>
          <form action="/register" method="post">
           
           
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="w-full bg-gray-200 border-none outline-none p-3 rounded mb-4"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full bg-gray-200 border-none outline-none p-3 rounded mb-4"
            />
            <select
              name="section"
              value={section}
              onChange={handleSectionChange}
              className="w-full bg-gray-200 border-none outline-none p-3 rounded mb-4"
            >
              <option value="" disabled>Select your section</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
              <option value="D">Section D</option>
              <option value="E">Section E</option>
              <option value="F">Section F</option>
              <option value="G">Section G</option>
              <option value="H">Section H</option>
            </select>

            <div className="mb-4">
              <span className="block mb-2 text-gray-600">Gender</span>
              <div className="flex justify-around">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={handleGenderChange}
                    className="form-radio h-5 w-5 text-blue-600 transition duration-300 ease-in-out transform hover:scale-110"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={handleGenderChange}
                    className="form-radio h-5 w-5 text-pink-600 transition duration-300 ease-in-out transform hover:scale-110"
                  />
                  <span className="ml-2">Female</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={gender === 'other'}
                    onChange={handleGenderChange}
                    className="form-radio h-5 w-5 text-green-600 transition duration-300 ease-in-out transform hover:scale-110"
                  />
                  <span className="ml-2">Other</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold p-3 rounded mt-4"
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="terms"
            className="form-checkbox h-4 w-4"
          />
          <span className="ml-2 text-sm">
            I have read and agree to the{' '}
            <a href="#" className="text-blue-500">Terms of Service</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
