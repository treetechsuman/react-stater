import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthAPI from "../api/authAPI";
import { useAPI } from "../hooks/useAPI";
import Message from "../components/common/Message";
import { useFlash } from "../components/common/FlashContext";
import Loading from "../components/common/Loading";

const ResetPassword = () => {
  const { execute, loading, error } = useAPI();
  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
    re_new_password: "",
  });

  const { addMessage } = useFlash();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPasswords((prevPass) => ({
      ...prevPass,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(passwords);
      const result = await execute(AuthAPI.setPassword, passwords);
      addMessage("Password reset successful", "success");
    } catch (error) {
      console.error("Error updating profile:", error);
      addMessage("An error occurred. Please try again." + error, "error");
    }
  };
  return (
    <div className="min-h-fit flex items-center justify-center">
      <div className="p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-4">Reset Password</h2>

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
            name="current_password"
            value={passwords.current_password || ""}
            className="grow bg-transparent"
            placeholder="Current Password"
            onChange={handleChange}
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
            name="new_password"
            value={passwords.new_password || ""}
            className="grow bg-transparent"
            placeholder="New Password"
            onChange={handleChange}
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
            name="re_new_password"
            value={passwords.re_new_password || ""}
            className="grow bg-transparent"
            placeholder="Re Enter New Password"
            onChange={handleChange}
          />
        </label>

        <button className="btn btn-warning w-full mt-4" onClick={handleSubmit}>
          {loading ? <Loading></Loading> : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
