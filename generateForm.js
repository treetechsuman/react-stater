import fs from "fs";
import path from "path";

// Resolve the current directory
const __dirname = path.resolve();

// Base directory for components
const componentsDir = path.join(__dirname, "src", "components/forms");

// Template for the new form component
const formComponentTemplate = (componentName) => `
import React, { useState , useRef } from "react";
import Input from "../common/Input";
import { useAPI } from "../../hooks/useAPI";
import { rules } from "../../utils/validation";
import Loading from "../common/Loading";
import { useFlash } from "../common/FlashContext";

const ${componentName} = ({ title = "${componentName}" }) => {
  const { execute, loading, error } = useAPI();
  const { addMessage } = useFlash();
  const [formData, setFormData] = useState({});
  const inputRefs = {
      field1: useRef(null),
      field2: useRef(null),
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
      //addMessage("Flash message successful", "success");
      console.log("Action successful:", result);
    } catch (err) {
      console.error("Error during action:", err);
      //addMessage("Flash message error", "error");
    }
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-fit flex items-center justify-center m-2">
      <div className="p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <Input
            ref={inputRefs.field1}
            name="field1"
            label="Field1"
            type="text"
            placeholder="Type here"
            value={formData.field1 || ""}
            validationRules={[rules.required, rules.min(6)]}
            onValueChange={handleValueChange}    
          />
          <Input
            ref={inputRefs.field2}
            name="field2"
            label="Field2"
            type="text"
            placeholder="Type here"
            value={formData.field2 || ""}
            validationRules={[rules.required, rules.min(6)]}
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

export default ${componentName};
`;

// Generate the component
const generateComponent = (relativePath) => {
  if (!relativePath) {
    console.error(
      "Please provide a folder path and component name (e.g., forms/FormName)."
    );
    return;
  }

  // Extract folder path and component name
  const parts = relativePath.split("/");
  const componentName = parts.pop(); // The last part is the component name
  const folderPath = path.join(componentsDir, ...parts);

  // Ensure the folder exists
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Created folder: ${folderPath}`);
  }

  // Component file path
  const filePath = path.join(folderPath, `${componentName}.jsx`);

  // Check if the file already exists
  if (fs.existsSync(filePath)) {
    console.error(
      `Component "${componentName}" already exists in "${folderPath}".`
    );
    return;
  }

  // Write the new component file
  fs.writeFileSync(filePath, formComponentTemplate(componentName));
  console.log(
    `Component "${componentName}" created successfully at ${filePath}`
  );
};

// Get the folder path and component name from command-line arguments
const relativePath = process.argv[2];
generateComponent(relativePath);
