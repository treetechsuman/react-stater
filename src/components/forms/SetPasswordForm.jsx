import React, { useState, useRef } from "react";
import Input from "../common/Input";
import { useAPI } from "../../hooks/useAPI";
import { rules } from "../../utils/validation";
import Loading from "../common/Loading";
import { useFlash } from "../common/FlashContext";
import AuthAPI from "../../api/authAPI";

const SetPasswordForm = ({ title = "Set new password" }) => {
  const { execute, loading, error } = useAPI();
  const { addMessage } = useFlash();
  const [formData, setFormData] = useState({});
  const inputRefs = {
    current_password: useRef(null),
    new_password: useRef(null),
    re_new_password: useRef(null),
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
      const result = await execute(AuthAPI.setPassword, formData);
      addMessage("Password reset successful", "success");
      console.log("Action successful:", result);
    } catch (err) {
      console.error("Error updating profile:", err);
      console.error("Responce updating profile:", err.response);
      addMessage(
        "An error occurred. Please try again." +
          JSON.stringify(err.response.data, null, 2),
        "error"
      );
    }
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-fit flex items-center justify-center m-2">
      <div className="p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <Input
            ref={inputRefs.current_password}
            name="current_password"
            label="Current Password"
            type="password"
            placeholder="Type here"
            value={formData.current_password || ""}
            validationRules={[rules.required, rules.min(8)]}
            onValueChange={handleValueChange}
          />
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
            validationRules={[
              rules.required,
              rules.confirmPassword(formData.new_password),
            ]}
            onValueChange={handleValueChange}
          />
          <button
            type="submit"
            className="btn btn-warning w-full mt-6"
            disabled={loading}
          >
            {loading ? <Loading /> : "Set new password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPasswordForm;
