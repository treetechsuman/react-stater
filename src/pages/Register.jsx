import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../utils/api"; // Assuming your API functions are in api.js

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(false); // Reset success state

    try {
      await registerUser(formData);
      setSuccess(true);
      // Redirect to the login page
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    } catch (err) {
      setError(err.response?.data || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-fit flex items-center justify-center">
      <div className="p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-4">Register</h2>

        {error && (
          <div className="text-red-500 text-sm mb-4">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </div>
        )}

        {success && (
          <div className="text-green-500 text-sm mb-4">
            Registration successful! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 mt-2">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="grow bg-transparent"
              placeholder="Username"
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mt-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="grow bg-transparent"
              placeholder="Email"
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mt-2">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="grow bg-transparent"
              placeholder="Password"
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mt-2">
            <input
              type="password"
              name="re_password"
              value={formData.re_password}
              onChange={handleChange}
              className="grow bg-transparent"
              placeholder="Confirm Password"
              required
            />
          </label>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;