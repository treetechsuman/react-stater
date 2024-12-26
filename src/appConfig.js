import Register from './pages/Register';
// src/config/navConfig.js
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Login from "./pages/Login";
import {HomeIcon , SearchIcon, ProfileIcon} from "./components/common/icons";


//import { FaSearch, FaHome, FaRegBell, FaAddressBook, FaUser } from "react-icons/fa";
export const brand = {
  name: "Work Log",
  path: "/",
};

// do not change this structure
export const links = [
    { label: "Home", path: "/", component: Home },
    { label: "About", path: "/about", component: About },
    { label: "Login", path: "/login", component: Login },
    
    { label: "Register", path: "/register", component: Register },
];

  export const bottomLinks = [
    { label: "Home", path: "/", icon: HomeIcon ,component: Home },
    { label: "Profile", path: "/profile", icon: ProfileIcon ,component: Profile },
    { label: "Search", path: "/search", icon: SearchIcon ,component: Search },
    
  ];

export const navSettings = {
  fixed: true,      // Whether the navbar should fixed to the top
};
