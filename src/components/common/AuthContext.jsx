import React, { createContext, useState, useEffect, useContext } from "react";
import AuthAPI from "../../api/authAPI"
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);
  const contextLogin = (token) => {
    localStorage.setItem("access_token", token);
    setIsAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout,contextLogin  }}>
      {children}
    </AuthContext.Provider>
  );
};
