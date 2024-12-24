import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    // Load the saved theme from localStorage or default to "light"
    return localStorage.getItem("theme") || "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save the selected theme
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    // Apply the saved or default theme on initial load
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="p-4">
      <button className="btn btn-primary btn-xs" href="#" onClick={toggleTheme}>
        {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </button>
    </div>
  );
};

export default ThemeToggle;
