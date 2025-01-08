import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { validateField } from "../../utils/validation";

const Input = forwardRef(
  (
    {
      name,
      label,
      type = "text",
      placeholder = "Type here",
      initialValue = "",
      validationRules = [],
      onValueChange,
      value = "", // Controlled value from parent
      disabled = false,
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value); // Internal state for input value
    const [error, setError] = useState("");

    // Update internal state when `value` prop changes
    useEffect(() => {
      setInputValue(value || "");
    }, [value]);

    // Handle field change
    const handleChange = (e) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      // Run validation
      const errorMessage = validateField(newValue, validationRules);
      setError(errorMessage);

      // Notify parent
      if (onValueChange) {
        onValueChange(name, newValue, errorMessage);
      }
    };

    // Validate on blur
    const handleBlur = () => {
      const errorMessage = validateField(inputValue, validationRules);
      setError(errorMessage);

      // Notify parent
      if (onValueChange) {
        onValueChange(name, inputValue, errorMessage);
      }
    };

    // Expose a method to trigger validation programmatically
    useImperativeHandle(ref, () => ({
      validate: () => {
        const errorMessage = validateField(inputValue, validationRules);
        setError(errorMessage);
        return errorMessage; // Return the error to the parent
      },
    }));

    return (
      <label htmlFor={name} className="w-full">
        <div className="label p-0 mt-5">
          <span className="label-text">{label}</span>
        </div>
        <input
          id={name}
          name={name}
          type={type}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`input input-bordered w-full ${
            error ? "input-error" : ""
          }`}
        />
        {error && (
          <>
            <span className="label-text-alt float-right text-red-800">
              {error}
            </span>
          </>
        )}
      </label>
    );
  }
);

export default Input;
