import React, { useState } from "react";
import Input from "../common/Input";
import { useAPI } from "../../hooks/useAPI";
import { rules } from "../../utils/validation";
import Loading from "../common/Loading";

const SampleForm = ({ title = "From title" }) => {
  const { execute, loading, error } = useAPI();
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleValueChange = (name, value, error) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are any validation errors
    if (Object.values(formErrors).some((error) => error)) {
      console.log("Form has errors:", formErrors);
      return;
    }
    //connect to api and submit data
    try {
      const result = await execute(AuthAPI.login, formData);
      addMessage("action successful", "success");
      console.log("action successful:", result);
      // Redirect to a secure route
      //navigate("/profile");
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
            name="text"
            label="text"
            type="text"
            validationRules={[rules.required, rules.min(6)]}
            onValueChange={handleValueChange}
          />
          <Input
            name="text1"
            label="text"
            type="text"
            validationRules={[rules.required, rules.min(6)]}
            onValueChange={handleValueChange}
          />
          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={loading}
          >
            {loading ? <Loading></Loading> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default SampleForm;
