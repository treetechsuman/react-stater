import React , { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUserProfile } from "../utils/api";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({ first_name: '', last_name: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
 // const { updateProfile, loading, error } = useAuth();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };
  const updateProfile = async () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      setError('Authentication required.');
      return;
    }
  
    try {
      // Assuming your API endpoint for updating user profile looks similar to this
      const response = await axios.put('http://127.0.0.1:8000/auth/users/me/', user, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log('Profile updated successfully:', response.data);
      // Maybe set user state if response includes updated data
      setUser(response.data);
      setSuccess(true);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile.');
    }
  };

  useEffect(() => {
    const loadUserProfile = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        setError('Authentication required.');
        return;
      }
  
      try {
        //alert(accessToken)
        const response = await fetchUserProfile(accessToken);
        console.log("API Response:", response.data); // Again, checking the actual data received
        //alert(response.data)
        setUser(response.data);
      } catch (error) {
        console.error("Error accessing protected endpoint:", error);
        setError('Error fetching user profile.');
      }
    };
  
    loadUserProfile();
  }, []);
  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-fit flex items-center justify-center">
      <div className="p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-4">Profile</h2>
        <h2 className="text-center text-2xl font-bold mb-4">wel come {user.email}</h2>

        {error && (
          <div className="text-red-500 text-sm mb-4">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </div>
        )}

        {success && (
          <div className="text-green-500 text-sm mb-4">
            Update successful!
          </div>
        )}
        <label className="input input-bordered flex items-center gap-2 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>

          <input
            type="text"
            className="grow bg-transparent"
            placeholder="First Name"
            value={user.first_name}
            name="first_name"
            onChange={handleChange}
            
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>

          <input
            type="text"
            className="grow bg-transparent"
            placeholder="Last Name"
            value={user.last_name}
            name="last_name"
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow bg-transparent"
            placeholder="Email"
            value={user.email}
            name="email"
            onChange={handleChange}
            disabled
          />
        </label>
        <button className="btn btn-primary w-full mt-4" onClick={updateProfile}>Update</button>
        {/* Reset password Links */}
        <div className="mt-4 text-center">
        {error && <p style={{ color: 'red' }}>{error}</p>}
          <Link to="/resetpassword" className="text-sm hover:underline">
            Reset password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
