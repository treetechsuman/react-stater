import apiClient from "./apiClient";

const AuthAPI = {
  login: async (credentials) => {
    const response = await apiClient.post("/auth/jwt/create/", credentials);
    const { access, refresh } = response.data;
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    //alert("autha api login token"+localStorage.getItem("refresh_token"))
    return response.data;
  },

  register: async (userData) => {
    const response = await apiClient.post("/auth/users/", userData);
    return response.data;
  },

  resetPassword: async (email) => {
    const response = await apiClient.post("/auth/reset-password", { email });
    return response.data;
  },

  logout: () => {
    //alert("logout called")
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};

export default AuthAPI;
