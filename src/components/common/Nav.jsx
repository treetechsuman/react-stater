import React, { useState, useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle";
import { Link, NavLink } from "react-router-dom";
import BarIcon from "./icons/BarIcon";
import CrossIcon from "./icons/CrossIcon"; // Assuming you have a CrossIcon component
import { useAuth } from "./AuthContext"
const Nav = ({ brand, links }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isAuthenticated , logout} = useAuth();
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    //alert("closeDropdown is trigger");
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        //alert("clicked out side");
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            onClick={toggleDropdown}
          >
            {isDropdownOpen ? <CrossIcon /> : <BarIcon />}
          </div>
          {isDropdownOpen && (
            <ul
              ref={dropdownRef}
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={ ({ isActive }) => (isActive ? "active" : "")}
                    onClick={closeDropdown}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              {/* Conditionally render Login or Logout */}
              {!isAuthenticated ? (
                <li>
                  <NavLink to="/login" onClick={closeDropdown}>
                    Login
                  </NavLink>
                </li>
              ) : (
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              )}
            </ul>
          )}
        </div>
        <NavLink className="btn btn-ghost text-xl" to={brand.path}>
          {brand.name}
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn btn-sm">Button</a>
        {!isAuthenticated ? (
               <Link to="/login" className="btn btn-sm">Login</Link>
              ) : (
                <a className="btn btn-sm" onClick={logout}>Logout</a>
              )}
        <ThemeToggle></ThemeToggle>
      </div>
    </div>
  );
};

export default Nav;
