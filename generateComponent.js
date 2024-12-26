import fs from 'fs';
import path from 'path';

// Resolve the current directory
const __dirname = path.resolve();

// Base directory for components
const componentsDir = path.join(__dirname, 'src', 'components');

// Template for the new component
const componentTemplate = (componentName) => `
import React from 'react';

const ${componentName} = ({}) => {
  return (
    <div>
      <h1>${componentName}</h1>
    </div>
  );
};

export default ${componentName};
`;

// Generate the component
const generateComponent = (relativePath) => {
  if (!relativePath) {
    console.error('Please provide a folder path and component name (e.g., common/ComponentName).');
    return;
  }

  // Extract folder path and component name
  const parts = relativePath.split('/');
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
    console.error(`Component "${componentName}" already exists in "${folderPath}".`);
    return;
  }

  // Write the new component file
  fs.writeFileSync(filePath, componentTemplate(componentName));
  console.log(`Component "${componentName}" created successfully at ${filePath}`);
};

// Get the folder path and component name from command-line arguments
const relativePath = process.argv[2];
generateComponent(relativePath);
