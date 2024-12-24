import React, { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";
import HomeIcon from "./icons/HomeIcon";
import ProfileIcon from "./icons/ProfileIcon";
import SearchIcon from "./icons/SearchIcon";
const BottomNav = ({ bottomLinks }) => {
  return (
    <div className="btm-nav">
        {bottomLinks.map((link, index) => (
        <Link
            key={index}
            to={link.path}
        >
            {<link.icon />}
            <span className="btm-nav-label">{link.label}</span>
        </Link>
        ))}
    </div>
  );
};

export default BottomNav;
