import React, { useState, useRef } from "react";
import Input from "../common/Input";
import { useAPI } from "../../hooks/useAPI";
import { rules } from "../../utils/validation";
import Loading from "../common/Loading";
import { useFlash } from "../common/FlashContext";
import AuthAPI from "../../api/authAPI";

const RegisterForm = ({ title = "RegisterForm Form" }) => {
  const { execute, loading, error } = useAPI();
  const { addMessage } = useFlash();
  const [formData, setFormData] = useState({});

  const inputRefs = {
    first_name: useRef(null),
    last_name: useRef(null),
    email: useRef(null),
    password: useRef(null),
    re_password: useRef(null),
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
      const result = await execute(AuthAPI.register, formData);
      addMessage("Registration successful", "success");
      console.log("Action successful:", result);
    } catch (err) {
      addMessage(
        "Error while registering Please try again." +
          JSON.stringify(err.response, null, 2),
        "error"
      );
      console.error("Error during action:", err);
    }
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-fit flex items-center justify-center m-2">
      <div className="p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <Input
            ref={inputRefs.first_name}
            name="first_name"
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            validationRules={[rules.required]}
            onValueChange={handleValueChange}
          />
          <Input
            ref={inputRefs.last_name}
            name="last_name"
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            validationRules={[rules.required]}
            onValueChange={handleValueChange}
          />
          <Input
            ref={inputRefs.email}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            validationRules={[rules.required, rules.email]}
            onValueChange={handleValueChange}
          />
          <Input
            ref={inputRefs.password}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password"
            validationRules={[rules.required, rules.min(8)]}
            onValueChange={handleValueChange}
          />
          <Input
            ref={inputRefs.re_password}
            name="re_password"
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            validationRules={[rules.confirmPassword(formData.password)]}
            onValueChange={handleValueChange}
          />

          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={loading}
          >
            {loading ? <Loading /> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
