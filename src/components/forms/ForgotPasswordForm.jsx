import React, { useState, useRef } from "react";
import Input from "../common/Input";
import { useAPI } from "../../hooks/useAPI";
import { rules } from "../../utils/validation";
import Loading from "../common/Loading";
import { useFlash } from "../common/FlashContext";
import { Link } from "react-router-dom";
import AuthAPI from "../../api/authAPI";

const ForgotPasswordForm = ({ title = "Enter your email to get reset link" }) => {
  const { execute, loading, error } = useAPI();
  const { addMessage } = useFlash();
  const [formData, setFormData] = useState({});
  const inputRefs = {
    email: useRef(null),
  };

  const handleValueChange = (name, value, error) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
      const result = await execute(AuthAPI.resetPassword, formData);
      //const result = await AuthAPI.resetPassword(formData);
      addMessage("Reset link is sent to email", "success");
      console.log("Action successful:", result);
      
    } catch (err) {
      console.error("Error during action:", err);
      addMessage("Flash message error", "error");
    }
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-fit flex items-center justify-center m-2">
      <div className="p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <Input
            ref={inputRefs.email}
            name="email"
            label="Email"
            type="email"
            placeholder="Type here"
            value={formData.email || ""}
            validationRules={[rules.required, rules.email]}
            onValueChange={handleValueChange}
          />
          <button
            type="submit"
            className="btn btn-primary w-full mt-6"
            disabled={loading}
          >
            {loading ? <Loading /> : "Submit"}
          </button>
        </form>
        {/* Login Links */}
        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
