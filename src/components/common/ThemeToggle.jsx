import React, { useState, useEffect } from "react";
import { useTheme } from "../layout/ThemeContext";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme(); // Get the current theme and toggle function from context

  

  
  return (
    <div className="p-4">
      <button className="btn btn-primary" href="#" onClick={toggleTheme}>
        {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </button>
    </div>
  );
};

export default ThemeToggle;
