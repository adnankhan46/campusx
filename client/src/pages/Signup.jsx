import React, { useState } from 'react';
import {Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSignUpMutation } from '../redux/apiSlice';
import { setCurrentUser, setLoading, setError } from '../redux/user/userSlice';

const Register = () => {
  const dispatch = useDispatch();
  const [signUp, { isLoading, error }] = useSignUpMutation();

  const navigate = useNavigate();

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

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
       const user = await signUp(formData).unwrap();
       console.log("user", user);
       dispatch(setCurrentUser(user));
       dispatch(setLoading(false));
       
        navigate("/home");
    } catch (err) {
      console.log(err.data.message);
      dispatch(setError(err.data.message));
      dispatch(setLoading(false));
    }
  }

  console.log(formData);

  return (
    <div className="h-screen flex items-center justify-center overflow-x-hidden bg-[#FAF4FE]">
      <div className="bg-white rounded-xl shadow-lg p-8 w-96">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-6">Create Account</h1>
          
          <span>
            Already have an account? <Link to="/login" className="text-blue-500">Sign In</Link>
          </span>
        </div>
        <div>
          <form onSubmit={handleOnSubmit}>
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
