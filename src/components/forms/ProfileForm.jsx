import React, { useState, useRef, useEffect } from "react";
import Input from "../common/Input";
import { useAPI } from "../../hooks/useAPI";
import { rules } from "../../utils/validation";
import Loading from "../common/Loading";
import { useFlash } from "../common/FlashContext";
import UserAPI from "../../api/userAPI";
import { Link, useNavigate } from "react-router-dom";

const ProfileForm = ({ title = "Profile" }) => {
  const navigate = useNavigate();
  const { execute, loading, error } = useAPI();
  const { addMessage } = useFlash();
  const [formData, setFormData] = useState({});

  const inputRefs = {
    first_name: useRef(null),
    last_name: useRef(null),
    email: useRef(null),
  };

  const handleValueChange = (name, value, error) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await execute(UserAPI.getUserDetails);
        console.log(userDetails);
        setFormData(userDetails);
        addMessage("Profile loaded test successfully!", "success");
      } catch (error) {
        console.error("Error fetching user details:", error);
        addMessage("Error fetching user details Please login:", "error");
        navigate("/login"); // Redirect to login
      }
    };
    fetchUserDetails();
  }, [execute]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const errors = Object.keys(inputRefs).reduce((acc, key) => {
      const error = inputRefs[key].current.validate(); // Call validate method
      if (error) acc[key] = error;
      return acc;
    }, {});

    if (Object.keys(errors).length > 0) {
      console.log("Form has errors:", errors);
      return;
    }

    // Proceed with API submission
    try {
      const result = await execute(UserAPI.updateProfile, formData);
      addMessage("Profile updated successfully!", "success");
      console.log("Action successful:", result);
    } catch (err) {
      
      console.error("Error updating profile:", err);
      addMessage("An error occurred. Please try again.", "error");
      
    }
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-fit flex items-center justify-center m-2">
      <div className="p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-4">{title}</h2>
        <h2 className="text-center text-2xl font-bold mb-4">
          Wel come {formData.email}
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            ref={inputRefs.first_name}
            name="first_name"
            label="First Name"
            type="text"
            placeholder="Type here"
            validationRules={[rules.required, rules.min(2)]}
            onValueChange={handleValueChange}
            value={formData.first_name || ""}
          />
          <Input
            ref={inputRefs.last_name}
            name="last_name"
            label="Last Name"
            type="text"
            placeholder="Type here"
            validationRules={[rules.required, rules.min(2)]}
            onValueChange={handleValueChange}
            value={formData.last_name || ""}
          />
          <Input
            ref={inputRefs.email}
            name="email"
            label="Email"
            type="email"
            placeholder="Type here"
            validationRules={[rules.required, rules.email]}
            onValueChange={handleValueChange}
            value={formData.email || ""}
            disabled
          />
          <button
            type="submit"
            className="btn btn-primary w-full mt-6"
            disabled={loading}
          >
            {loading ? <Loading /> : "Update"}
          </button>
        </form>
        {/* Reset password Links */}
        <div className="mt-4 text-center">
          <Link to="/setpassword" className="text-sm hover:underline">
            Set new password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
