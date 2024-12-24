import React, { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";
import BarIcon from "./icons/BarIcon";
const Nav = ({ brand, links }) => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <BarIcon/>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links.map((link, index) => (
              <li key={index}>
                <Link
                    to={link.path}
                >{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link 
            className="btn btn-ghost text-xl"
            to={brand.path}
            >{brand.name}</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        {links.map((link, index) => (
              <li key={index}>
                <Link
                    to={link.path}
                >{link.label}</Link>
              </li>
            ))}
            
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
        <ThemeToggle></ThemeToggle>
      </div>
    </div>
  );
};

export default Nav;
