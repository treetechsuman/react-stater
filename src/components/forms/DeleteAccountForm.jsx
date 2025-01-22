
import React, { useState , useRef } from "react";
import Input from "../common/Input";
import { useAPI } from "../../hooks/useAPI";
import { rules } from "../../utils/validation";
import Loading from "../common/Loading";
import { useFlash } from "../common/FlashContext";
import AuthAPI from '../../api/authAPI';

const DeleteAccountForm = ({ title = "Delete Account" }) => {
  const { execute, loading, error } = useAPI();
  const { addMessage } = useFlash();
  const [formData, setFormData] = useState({});
  const inputRefs = {
    current_password: useRef(null),
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
      const result = await execute(AuthAPI.deleteAccount, formData);
      addMessage("Account has been deleted successfully", "success");
      console.log("Action successful:", result);
    } catch (err) {
      console.error("Error during action:", err);
      addMessage("Error Occure try again", "error");
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
            label="Password"
            type="password"
            placeholder="Type here"
            value={formData.current_password || ""}
            validationRules={[rules.required, rules.min(6)]}
            onValueChange={handleValueChange}    
          />
          
          <button
            type="submit"
            className="btn btn-warning w-full mt-6"
            disabled={loading}
          >
            {loading ? <Loading /> : "Delete Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccountForm;
