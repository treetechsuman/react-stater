import React, {useState} from "react";
//import { GoogleLogin } from "@react-oauth/google";
import { Link , useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from 'axios';

const LoginForm = ({}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authenticate, loading, error } = useAuth();

 

  const handleSubmit = async (event) => {
    event.preventDefault();
    authenticate(email, password);
  };

  const handleGoogleSuccess = (response) => {
    console.log("Google login success", response);
    // Handle the login success with response.credential
  };

  const handleGoogleFailure = (error) => {
    console.log("Google login failed", error);
    // Handle login failure
  };

  
  return (
    <div className="min-h-fit flex items-center justify-center">
      <div className="p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
        <label className="input input-bordered flex items-center gap-2 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            name="email"
            className="grow bg-transparent"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow bg-transparent"
            placeholder="Password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button 
          className="btn btn-primary w-full mt-4"
          disabled={loading}
          >{loading ? 'Logging in...' : 'Log In'}</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {/* Forgot Password and Register Links */}
        <div className="mt-4 text-center">
          <Link to="/forgotpassword" className="text-sm hover:underline">
            Forgot Password?
          </Link>
          <div className="mt-2">
            <Link to="/register" className="text-sm hover:underline">
              Don't have an account? Register
            </Link>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default LoginForm;
