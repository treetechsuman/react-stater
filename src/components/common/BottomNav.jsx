import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "./icons/HomeIcon";
import ProfileIcon from "./icons/ProfileIcon";
import SearchIcon from "./icons/SearchIcon";
const BottomNav = ({ bottomLinks }) => {
  return (
    <div className="btm-nav shadow ">
        {bottomLinks.map((link, index) => (
        <NavLink
            key={index}
            to={link.path}
            className={`hover:border-b-2 ({ isActive }) => (isActive ? "active" : "")`}
        >
            {<link.icon />}
            <span className="btm-nav-label">{link.label}</span>
        </NavLink>
        ))}
    </div>
  );
};

export default BottomNav;
