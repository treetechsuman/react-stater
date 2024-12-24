// src/config/navConfig.js
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import {HomeIcon , SearchIcon, ProfileIcon} from "./components/common/icons";


//import { FaSearch, FaHome, FaRegBell, FaAddressBook, FaUser } from "react-icons/fa";
export const brand = {
  name: "Work Log",
  path: "/",
};

export const links = [
    { label: "Home", path: "/home", component: Home },
   
    { label: "About", path: "/about", component: About },
    
  ];

  export const bottomLinks = [
    { label: "Home", path: "/home", icon: HomeIcon ,component: Home },
    { label: "Profile", path: "/profile", icon: ProfileIcon ,component: Profile },
    { label: "Search", path: "/search", icon: SearchIcon ,component: Search },
    
  ];

export const navSettings = {
  fixed: true,      // Whether the navbar should fixed to the top
};
