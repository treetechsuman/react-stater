import React from "react";
import { useAuth } from "../components/common/AuthContext";

const LogoutButton = () => {
  const { logout } = useAuth();

  return <button className="btn btn-primary w-full mt-4" onClick={logout}>Logout</button>;
};

export default LogoutButton;