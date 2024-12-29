// hooks/useAuth.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const authenticate = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const response = await login({ email, password });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/profile');
    } catch (err) {
      setError('Invalid credentials or server error');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to update the user's profile
  const updateProfile = async (profileData) => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      setError('Authentication required.');
      return;
    }
    try {
      const response = await axios.put("/auth/users/me/", profileData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setUser(response.data); // Update the local user state
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error updating profile:", error);
      return { success: false, error: error.response?.data || "Update failed" };
    }
  };

  

  return { authenticate,updateProfile, loading, error };
};

export default useAuth;
