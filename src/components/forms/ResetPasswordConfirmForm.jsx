
import React, { useState , useRef } from "react";
import Input from "../common/Input";
import { useAPI } from "../../hooks/useAPI";
import { rules } from "../../utils/validation";
import Loading from "../common/Loading";
import { useFlash } from "../common/FlashContext";
import AuthAPI from "../../api/authAPI";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ResetPasswordConfirmForm = ({ title = "Enter New Password" }) => {
  const navigate = useNavigate();
  const { execute, loading, error } = useAPI();
  const { addMessage } = useFlash();
  const [formData, setFormData] = useState({});
  const inputRefs = {
      new_password: useRef(null),
      re_new_password: useRef(null),
  };
  const { uid, token } = useParams(); // Extract uid and token from the URL

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
    // Append uid and token to formData
    const completeFormData = {
      ...formData,
      uid,    // Add uid from URL
      token,  // Add token from URL
    };

    // Proceed with API submission
    try {
      const result = await execute(AuthAPI.resetPasswordConfirm, completeFormData);
      addMessage("Password change successful", "success");
      console.log("Action successful:", result);
      navigate("/login"); // Redirect to login
    } catch (err) {
      console.error("Error during action:", err);
      addMessage("Something went wrong try again", "error");
    }
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-fit flex items-center justify-center m-2">
      <div className="p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <Input
            ref={inputRefs.new_password}
            name="new_password"
            label="New Password"
            type="password"
            placeholder="Type here"
            value={formData.new_password || ""}
            validationRules={[rules.required, rules.min(8)]}
            onValueChange={handleValueChange}    
          />
          <Input
            ref={inputRefs.re_new_password}
            name="re_new_password"
            label="Confirm Password"
            type="password"
            placeholder="Type here"
            value={formData.re_new_password || ""}
            validationRules={[rules.required, rules.confirmPassword(formData.new_password)]}
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
      </div>
    </div>
  );
};

export default ResetPasswordConfirmForm;
