import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../common/Input";
import { rules } from "../../utils/validation";
const LoginForm = () => {
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleValueChange = (name, value, error) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if there are any validation errors
    if (Object.values(formErrors).some((error) => error)) {
      console.log("Form has errors:", formErrors);
      return;
    }

    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-fit flex items-center justify-center">
      <div className="p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="enter email"
            validationRules={[rules.required, rules.email]}
            onValueChange={handleValueChange}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            validationRules={[rules.required, rules.min(6)]}
            onValueChange={handleValueChange}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        {/* Forgot Password and Register Links */}
        <div className="mt-4 text-center">
          <Link to="/forgotpassword" className="text-sm hover:underline">
            Forgot Password?
          </Link>
          <div className="mt-2">
            <Link to="/register" className="text-sm hover:underline">
              Don't have an account? Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
