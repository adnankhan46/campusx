// src/components/Register.js
import React, { useState } from 'react';
import {Link } from "react-router-dom"

const Register = () => {

  const [formData, setFormData] = useState({
    admissionNumber: '',
    email: '',
    password: '',
    section: '',
    gender: '',
  }); 
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value.trim()});
  };

  const handleOnSubmit = async () => {

  }

  console.log(formData);

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
          <form method="post">
            <input
              type="text"
              name="admissionNumber"
              value={formData.admissionNumber}
              onChange={handleChange}
              placeholder="Addmission Number (From Id Card)"
              className="w-full bg-gray-200 border-none outline-none p-3 rounded-xl mb-4"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full bg-gray-200 border-none outline-none p-3 rounded-xl mb-4"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-gray-200 border-none outline-none p-3 rounded-xl mb-4"
            />
            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="w-full bg-gray-200 border-none outline-none p-3 rounded-xl mb-4"
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
              <option value="H">Section I</option>
              <option value="H">Section J</option>
              <option value="H">Section K</option>
              <option value="H">Section L</option>
            </select>

            <div className="mb-4">
              <span className="block mb-2 text-gray-600">Gender</span>
              <div className="flex justify-around">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === 'Male'}
                    onChange={handleChange}
                    className="form-radio h-5 w-5 text-blue-600 transition duration-300 ease-in-out transform hover:scale-110"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === 'Female'}
                    onChange={handleChange}
                    className="form-radio h-5 w-5 text-pink-600 transition duration-300 ease-in-out transform hover:scale-110"
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold p-3 rounded-xl mt-4"
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex items-center mt-4 mx-auto">
        
          <div className="ml-2 text-sm">
            Need Help? Someone Already Signed Up with My Account?{' '}
            <Link to="/ReportAuth">
            <span className="text-blue-500 cursor-pointer text-sm">Tell Your Admission Number here</span>
            </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
