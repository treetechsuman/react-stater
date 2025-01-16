
import React, { useState , useRef } from "react";
import Input from "../common/Input";
import { useAPI } from "../../hooks/useAPI";
import { rules } from "../../utils/validation";
import Loading from "../common/Loading";
import { useFlash } from "../common/FlashContext";
import AuthAPI from "../../api/authAPI";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ActivateAccountForm = ({ title = "Activate Account" }) => {
  const navigate = useNavigate();
  const { execute, loading, error } = useAPI();
  const { addMessage } = useFlash();
  const [formData, setFormData] = useState({});
  const inputRefs = {
      field1: useRef(null),
      field2: useRef(null),
  };
  const { uid, token } = useParams(); // Extract uid and token from the URL
  const handleValueChange = (name, value, error) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    // Append uid and token to formData
    const completeFormData = {
      ...formData,
      uid,    // Add uid from URL
      token,  // Add token from URL
    };
    // Proceed with API submission
    try {
      const result = await execute(AuthAPI.activateAccount, completeFormData);
      addMessage("Account activation successful", "success");
      console.log("Action successful:", result);
    } catch (err) {
      console.error("Error during action:", err);
      addMessage("Error occure, or your account is already active", "error");
    }
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-fit flex items-center justify-center m-2">
      <div className="p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          
          
          <button
            type="submit"
            className="btn btn-primary w-full mt-6"
            disabled={loading}
          >
            {loading ? <Loading /> : "Click to Activate Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActivateAccountForm;
