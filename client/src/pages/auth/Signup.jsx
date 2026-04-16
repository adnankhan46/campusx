import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSignUpMutation } from '../../redux/apiSlice';
import { setCurrentUser, setLoading, setError } from '../../redux/user/userSlice';

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

  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Admission Number validation
    if (!formData.admissionNumber.trim()) {
      errors.admissionNumber = 'Admission number is required';
    } else if (formData.admissionNumber.length !== 4) {
      errors.admissionNumber = 'Must be exactly 4 digits';
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      errors.password = 'Password must be at least 4 characters';
    }

    // Section validation
    if (!formData.section) {
      errors.section = 'Please select your branch';
    }

    // Gender validation
    if (!formData.gender) {
      errors.gender = 'Please select your gender';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors({ ...validationErrors, [name]: '' });
    }
    
    // 4-digit limit for admission number
    if (name === 'admissionNumber') {
      if (value === '' || (/^\d+$/.test(value) && value.length <= 4)) {
        setFormData({ ...formData, [name]: value });
      }
      return;
    }
    
    setFormData({ ...formData, [name]: value.trim() });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    dispatch(setLoading(true));
    try {
      const user = await signUp(formData).unwrap();
      dispatch(setCurrentUser(user.data));
      dispatch(setLoading(false));
      navigate("/explore");
    } catch (err) {
      console.log(err.data?.message);
      dispatch(setLoading(false));
    }
  }



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
            <div className="mb-4">
              <input
                type="text"
                name="admissionNumber"
                value={formData.admissionNumber}
                onChange={handleChange}
                placeholder="Starting year of graduation"
                inputMode="numeric"
                className={`w-full bg-gray-200 border-2 outline-none p-3 rounded-xl ${
                  validationErrors.admissionNumber ? 'border-red-500' : 'border-transparent'
                }`}
              />
              <div className={'text-gray-400 text-sm mt-1'}>{`4 digit (Example: 2026)`}</div>
              {validationErrors.admissionNumber && (
                <div className="text-red-500 text-sm mt-1">{validationErrors.admissionNumber}</div>
              )}
            </div>

            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email (We will never spam you)"
                className={`w-full bg-gray-200 border-2 outline-none p-3 rounded-xl ${
                  validationErrors.email ? 'border-red-500' : 'border-transparent'
                }`}
              />
              {validationErrors.email && (
                <div className="text-red-500 text-sm mt-1">{validationErrors.email}</div>
              )}
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full bg-gray-200 border-2 outline-none p-3 rounded-xl ${
                  validationErrors.password ? 'border-red-500' : 'border-transparent'
                }`}
              />
              {validationErrors.password && (
                <div className="text-red-500 text-sm mt-1">{validationErrors.password}</div>
              )}
            </div>
            <div className="mb-4">
              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                className={`w-full bg-gray-200 border-2 outline-none p-3 rounded-xl ${
                  validationErrors.section ? 'border-red-500' : 'border-transparent'
                }`}
              >
                <option value="" disabled>Select your Branch</option>
                <option value="CSE">CSE</option>
                <option value="CSE AI">CSE AI</option>
                <option value="CSE DS">CSE DS</option>
                <option value="ETC">ETC</option>
                <option value="IT">IT</option>
                <option value="ECS">ECS</option>
                <option value="ITCS">ITCS</option>
                <option value="EE">EE</option>
                <option value="EEE">EEE</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
              </select>
              {validationErrors.section && (
                <div className="text-red-500 text-sm mt-1">{validationErrors.section}</div>
              )}
            </div>

            <div className="mb-4">
              <span className="block mb-2 text-gray-600">Gender <span className="text-red-500">*</span></span>
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
              {validationErrors.gender && (
                <div className="text-red-500 text-sm mt-1">{validationErrors.gender}</div>
              )}
            </div>

            {error && <div className="text-red-500 bg-red-50 p-3 rounded mb-4 text-sm">{error?.data?.message || 'Signup failed'}</div>}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-white font-semibold p-3 rounded-xl mt-4 transition ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isLoading ? "Loading..." : "Get In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
