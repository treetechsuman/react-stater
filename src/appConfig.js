import ActivateAccount from './pages/ActivateAccount';
import DeleteAccount from './pages/DeleteAccount';

import ResetPasswordConfirm from './pages/ResetPasswordConfirm';
import SetPassword from "./pages/SetPassword";
import Logout from "./pages/Logout";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Login from "./pages/Login";
import { HomeIcon, SearchIcon, ProfileIcon } from "./components/common/icons";

export const brand = {
  name: "React Starter App",
  path: "/",
};

// do not change this structure
export const links = [
  { label: "Home", path: "/", component: Home },
  { label: "About", path: "/about", component: About },
 
  { label: "Register", path: "/register", component: Register },
    { label: "DeleteAccount", path: "/deleteaccount", component: DeleteAccount },
    { label: "ActivateAccount", path: "/activate/:uid/:token", component: ActivateAccount },
];

export const bottomLinks = [
  { label: "Home", path: "/", icon: HomeIcon, component: Home },
  { label: "Profile", path: "/profile", icon: ProfileIcon, component: Profile },
  { label: "Search", path: "/search", icon: SearchIcon, component: Search },
];

export const hiddenLinks = [
  {
    label: "ForgotPassword",
    path: "/forgotpassword",
    component: ForgotPassword,
  },
  { label: "Login", path: "/login", component: Login },
  { label: "Logout", path: "/logout", component: Logout },
  { label: "ResetPasswordConfirm", path: "/password-reset/confirm/:uid/:token", component: ResetPasswordConfirm }, 
  { label: "SetPassword", path: "/setpassword", component: SetPassword },
  
];

export const proctedLinks = [
  { label: "Profile", path: "/profile", icon: ProfileIcon, component: Profile },
];

export const navSettings = {
  fixed: true, // Whether the navbar should fixed to the top
};

export const appSettings = {
  isDevelopment: false,
};


