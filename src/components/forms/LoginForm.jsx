import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../common/Input";
import { useAPI } from "../../hooks/useAPI";
import { rules } from "../../utils/validation";
import Loading from "../common/Loading";
import AuthAPI from "../../api/authAPI";
import { useFlash } from "../common/FlashContext";
import { useAuth } from "../common/AuthContext";
const LoginForm = ({ title = "Login" }) => {
  const { contextLogin} = useAuth();
  const navigate = useNavigate();
  const { addMessage } = useFlash();
  const { execute, loading, error } = useAPI();
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const inputRefs = {
    email: useRef(null),
    password: useRef(null),
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
      //const result = await execute(API.function, formData);
      const result = await execute(AuthAPI.login, formData);
      addMessage("Login successful", "success");
      console.log("Login successful:", result);
      contextLogin(localStorage.getItem("access_token"));
      navigate("/profile"); // Redirect to a secure route
    } catch (err) {
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
            ref={inputRefs.email}
            name="email"
            label="Email"
            type="email"
            validationRules={[rules.required, rules.email]}
            onValueChange={handleValueChange}
            
          />
          <Input
            ref={inputRefs.password}
            name="password"
            label="Password"
            type="password"
            validationRules={[rules.required, rules.min(6)]}
            onValueChange={handleValueChange}
          
          />
          <button
            type="submit"
            className="btn btn-primary w-full mt-6"
            disabled={loading}
          >
            {loading ? <Loading /> : "Login"}
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
