import React from "react";
import AuthAPI from "../api/authAPI";
import { Link, useNavigate } from "react-router-dom";
import { useFlash } from "../components/common/FlashContext";

const LogoutButton = () => {
  const { addMessage } = useFlash();
  const navigate = useNavigate();
  const handleLogout = () => {
    AuthAPI.logout(); // Call the logout function from AuthAPI
    addMessage("log out successful", "success");
    navigate("/login"); // Redirect to a secure route
  };
  return (
    <button className="btn btn-primary w-full mt-4" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
