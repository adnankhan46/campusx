// src/components/Login.js
import React from 'react';

const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 to-yellow-200">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Sign In</h1>
          <span>
            Don't have an account? <a href="register" className="text-blue-500">Create Account</a>
          </span>
        </div>
        <div>
          <form action="/login" method="post">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="w-full bg-gray-200 border-none outline-none p-3 rounded-xl mb-4"
            />
            <input
              type="password"
              name="password"
              id="password"
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
          <input
            type="checkbox"
            id="remember"
            className="form-checkbox h-4 w-4"
          />
          <span className="ml-2 text-sm">
            Remember Me
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
