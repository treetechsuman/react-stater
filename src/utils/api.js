import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/auth/";

// Set up axios to use the base URL
axios.defaults.baseURL = API_BASE_URL;

// Function to refresh the access token
const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem("refresh_token");
    const response = await axios.post("jwt/refresh/", { refresh });
    const newAccessToken = response.data.access;
    localStorage.setItem("access_token", newAccessToken);
    return newAccessToken;
  } catch (err) {
    console.error("Failed to refresh token:", err);
    // If refresh fails, log the user out or redirect to login
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login"; // Redirect to login page
    throw err;
  }
};


// Add a request interceptor
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token"); // Use the correct token key
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Axios response interceptor to handle token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// to login and get token
export const login = async (loginData) => {
  return axios.post("jwt/create/", loginData);
};


// to get logined user profile
export const fetchUserProfile = () => {
  return axios.get("users/me/");
};

// Function to register a new user
export const registerUser = async (registrationData) => {
  try {
    const response = await axios.post("users/", registrationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to request a password reset
export const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post("users/reset_password/", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to confirm a password reset
export const confirmPasswordReset = async (resetData) => {
  try {
    const response = await axios.post("users/reset_password_confirm/", resetData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to change the user's password
export const changePassword = async (passwordData) => {
  try {
    const response = await axios.post("users/set_password/", passwordData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to log out the user
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
};