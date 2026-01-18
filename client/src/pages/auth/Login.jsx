import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar';
import { useDispatch } from 'react-redux';
import { useSignInMutation } from '../../redux/apiSlice';
import { setCurrentUser, setLoading, setError } from '../../redux/user/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [signIn, { isLoading, error }] = useSignInMutation();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value.trim() });
  };

  const validate = () => {
    const errors = {};

    if (!credentials.email) {
      errors.admissionNumber = 'Email is required';
    }

    if (!credentials.password) {
      errors.password = 'Password is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    dispatch(setLoading(true));
    try {
      const userCredentials = await signIn(credentials).unwrap();
      console.log("User credentials: ", userCredentials.data);
      dispatch(setCurrentUser(userCredentials.data));
      dispatch(setLoading(false));

      if (userCredentials.statusCode === 200) {
        navigate("/home");

      }



    } catch (err) {
      dispatch(setError(err?.data?.message || error?.message));
      console.log(err?.data?.message || error?.message);
      dispatch(setLoading(false));

    }
  };



  return (
    <>
      <Navbar />
      <div className="h-screen flex items-center justify-center overflow-x-hidden bg-[#FAF4FE]">
        <div className="bg-white rounded-xl shadow-lg p-8 w-96">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold mb-6">Log In</h1>
            <span>
              Dont have an account? <Link to="/signup" className="text-blue-500">Create Account</Link>
            </span>
          </div>
          {error && <div className="text-red-500">Error: {error.data.message}</div>}
          <div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="Valid Email"
                  className="w-full bg-gray-200 border-none outline-none p-3 rounded-xl"
                />
                {errors.admissionNumber && <p className="text-red-500 text-sm">{errors.admissionNumber}</p>}
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full bg-gray-200 border-none outline-none p-3 rounded-xl"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold p-3 rounded-xl mt-4"
              >
                {isLoading ? "Loading..." : "Sign In"}
              </button>
            </form>
          </div>
          <div className="flex items-center mt-4">

          </div>
          <div className="text-center mt-4">

            <Link to="/report" className="text-red-500">Report a Problem</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
