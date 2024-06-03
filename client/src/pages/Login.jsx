// src/components/Login.js
import React, { useState } from 'react';
import {Link, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useSignInMutation } from '../redux/apiSlice';
import { setCurrentUser, setLoading, setError } from '../redux/user/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Error Dikhana h
  const [signIn, { isLoading, error, isError }] = useSignInMutation();

  isLoading ? console.log("Loading...") : ""

  const [credentials, setCredentials] = useState({
    admissionNumber: '',
    password: '',
  });


  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value.trim()});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setError(true));
    try {
      const userCredentials = await signIn(credentials).unwrap();
       console.log("Aane wala: ", userCredentials);
       dispatch(setCurrentUser(userCredentials));
       dispatch(setLoading(false));

       navigate("/home");
    } catch (err) {
      dispatch(setError(err?.data?.message || error?.message));
      console.log(err?.data?.message || error?.message);
      setError(err?.data?.message);
      dispatch(setLoading(false));
    }

  }
  return (
    <>
      
      <div className="h-screen flex items-center justify-center overflow-x-hidden bg-[#FAF4FE]">
        <div className="bg-white rounded-xl shadow-lg p-8 w-96">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold mb-6">Log In</h1>
            <span>
              Don't have an account? <Link to="/signup" className="text-blue-500">Create Account</Link>
            </span>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                name="admissionNumber"
                value={credentials.admissionNumber}
                onChange={handleChange}
                placeholder="Admission Number"
                className="w-full bg-gray-200 border-none outline-none p-3 rounded-xl mb-4"
              />
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-gray-200 border-none outline-none p-3 rounded-xl mb-4"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold p-3 rounded-xl mt-4"
              >
                Sign In
              </button>
            </form>
          </div>
          <div className="flex items-center mt-4">
           
          </div>
          <div className="text-center mt-4">
            <div>{error ? error.data | "Error" : ""}</div>
            <div>{isLoading && "Loading..."}</div>
            <Link to="/reportAuth" className="text-red-500">Report a Problem</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
