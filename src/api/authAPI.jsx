import apiClient from "./apiClient";

import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const AuthAPI = {
   
  login: async (credentials) => {
    const response = await apiClient.post("/auth/jwt/create/", credentials);
    const { access, refresh } = response.data;
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    //setIsAuthenticated(true);
    //alert("autha api login token"+localStorage.getItem("refresh_token"))
    return response.data;
  },

  register: async (userData) => {
    const response = await apiClient.post("/auth/users/", userData);
    return response.data;
  },
  deleteAccount: async (formData) => {
    const response = await apiClient.delete("/auth/users/me/", formData);
    return response.data;
  },

  resetPassword: async (email) => {
    
      // Step 1: Get the CSRF token
      const result = await axios.get(API_URL+"auth/csrf-token/");
      const csrfToken = result.data.csrfToken; // Ensure the token is retrieved correctly
     
      // Step 2: Send the password reset request
      const response = await axios.post(
        API_URL+"auth/users/reset-password/",
        email , // Wrap email in an object
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            //"X-CSRFTOKEN" : csrfToken, // Include CSRF token in the header
          
          },
        }
      );
  
      return response.data;
    
  },
  resetPasswordConfirm: async (formData) => {
    
    const response = await axios.post(
       API_URL+"auth/users/reset_password_confirm/",
      formData , // Wrap email in an object
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          //"X-CSRFTOKEN" : csrfToken, // Include CSRF token in the header
        
        },
      }
    );

    return response.data;
  
},
activateAccount: async (formData) => {
    
  const response = await axios.post(
     API_URL+"auth/users/activation/",
    formData , // Wrap email in an object
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        //"X-CSRFTOKEN" : csrfToken, // Include CSRF token in the header
      
      },
    }
  );

  return response.data;

},

  setPassword: async (passwords) => {
    console.log(passwords);
    const response = await apiClient.post(
      "/auth/users/set_password/",
      passwords
    );
    return response.data;
  },

  logout: () => {
    //alert("logout called")
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};

export default AuthAPI;
