import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/common/Message";
import AuthAPI from "../api/authAPI";
import { useFlash } from "../components/common/FlashContext";
import Loading from "../components/common/Loading";
import { useAPI } from "../hooks/useAPI";
const Register = () => {
  const { execute, loading, error } = useAPI();
  const { addMessage } = useFlash();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await execute(AuthAPI.register, formData);

      addMessage(
        "Registration  completed successfully! Now Login and Enjoy!!",
        "success"
      );
      console.log("Registration successful:", result);
      navigate("/login"); // Redirect to a secure route
    } catch (err) {
      addMessage("Error while registering Please try again.", "error");

      console.error("Error during registering:", err);
    }
  };

  return (
    <div className="min-h-fit flex items-center justify-center">
      <div className="p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-4">Register</h2>

        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 mt-2">
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="grow bg-transparent"
              placeholder="First Name"
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mt-2">
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="grow bg-transparent"
              placeholder="Last Name"
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
            {loading ? <Loading></Loading> : "Register"}
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
