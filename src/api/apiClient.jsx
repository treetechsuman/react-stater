
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Refresh token utility
const refreshToken = async () => {
  //alert("refreshToken is call with :", localStorage.getItem("refresh_token"));
  try {
    const refresh = localStorage.getItem("refresh_token");
    const response = await apiClient.post("auth/jwt/refresh/", { refresh });
    const newAccessToken = response.data.access;
    //alert("refresh token function", response.data);
    localStorage.setItem("access_token", newAccessToken);
    return newAccessToken;
  } catch (err) {
    console.error("Failed to refresh token:", err);
    // If refresh fails, log the user out or redirect to login
    //localStorage.removeItem("access_token");
    //localStorage.removeItem("refresh_token");
    //window.location.href = "/login"; // Redirect to login page
    throw err;
  }
};

// Add interceptors
apiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("access_token");
    //alert("Client token"+localStorage.getItem("access_token"))
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        const statusCode = err.response?.status;
        const errorMessage = err.response?.data?.detail || err.message;

        console.error("Error refreshing token:", errorMessage);

        // Check if the error is due to an invalid refresh token
        if (statusCode === 401 && errorMessage.includes("Invalid token")) {
          console.error("Invalid refresh token. Logging out.");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login"; // Redirect to login page
        } else {
          // Handle other errors (e.g., network issues)
          console.error(
            "Refresh failed due to other reasons. Retaining refresh token."
          );
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
