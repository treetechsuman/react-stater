import React from "react";
import AuthAPI from "../api/authAPI";
import { Link, useNavigate } from "react-router-dom";

const LogoutButton = () => {
   const navigate = useNavigate();
  const handleLogout = () => {
    AuthAPI.logout(); // Call the logout function from AuthAPI
    navigate("/login"); // Redirect to a secure route
  };
  return <button className="btn btn-primary w-full mt-4" onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;