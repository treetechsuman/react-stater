import apiClient from "./apiClient";

const UserAPI = {
  updateProfile: async (profileData) => {
    const response = await apiClient.put("/auth/users/me/", profileData);
    return response.data;
  },

  getUserDetails: async () => {
    //console.log("Fetching user details...");
    //console.log("Token in headers:", apiClient.defaults.headers.common["Authorization"]);
    const response = await apiClient.get("/auth/users/me");
    return response.data;
  },
};

export default UserAPI;
