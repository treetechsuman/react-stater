import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/common/Message";
import AuthAPI from "../api/authAPI";
const Register = () => {

  const [message,setMessage]= useState("");
  const [messageType,setMessageType]=useState("info");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await AuthAPI.register(formData);
      setMessageType("success");
      setMessage("Registration  completed successfully!");
      console.log("Registration successful:", result);
      navigate("/login"); // Redirect to a secure route
    } catch (err) {
      setMessageType("error");
      setMessage("Error while registering Please try again.",);
      
      console.error("Error during registering:", err);
    }
  };

  return (
    <div className="min-h-fit flex items-center justify-center">
      <div className="p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-4">Register</h2>
        <Message
          message={message}
          type={messageType}
          onClose={() => setMessage("")} // Hide the message when close button is clicked
        />
        

        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 mt-2">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="grow bg-transparent"
              placeholder="Username"
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mt-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="grow bg-transparent"
              placeholder="Email"
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mt-2">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="grow bg-transparent"
              placeholder="Password"
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mt-2">
            <input
              type="password"
              name="re_password"
              value={formData.re_password}
              onChange={handleChange}
              className="grow bg-transparent"
              placeholder="Confirm Password"
              required
            />
          </label>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;