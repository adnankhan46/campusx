import React from 'react';

const RegisterForm = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-pink-500 to-yellow-300">
      <div className="card rounded-lg shadow-lg bg-white w-96 p-8 space-y-6">
        <div className="card_title text-center">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <span className="text-sm block">Already have an account? <a href="login" className="text-blue-500">Sign In</a></span>
        </div>
        <div className="form space-y-4">
          <form action="/register" method="post">
            <input type="text" name="username" id="username" placeholder="UserName" className="input" />
            <input type="email" name="email" placeholder="Email" id="email" className="input" />
            <input type="password" name="password" placeholder="Password" id="password" className="input" />
            
            
            <select name="gender" id="gender" className="input">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div className="section-select">
              <label htmlFor="section" className="block text-sm font-medium text-gray-700">Select Section</label>
              <select name="section" id="section" className="input">
                <option value="">Select Section</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>
            <button className="btn w-full">Sign Up</button>
          </form>
        </div>
        <div className="card_terms flex items-center">
          <input type="checkbox" name="" id="terms" className="checkbox" />
          <span className="text-sm">I have read and agree to the <a href="" className="text-blue-500">Terms of Service</a></span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
