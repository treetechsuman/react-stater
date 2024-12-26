import fs from 'fs';
import path from 'path';

// Resolve the current directory
const __dirname = path.resolve();

// Directories
const pagesDir = path.join(__dirname, 'src', 'pages');
const configFilePath = path.join(__dirname, 'src', 'appConfig.js');

// Template for the new page
const pageTemplate = (pageName) => `
import React from 'react';

const ${pageName} = () => {
  return (
    <div>
      <h1>${pageName}</h1>
      <p>Welcome to the ${pageName} page!</p>
    </div>
  );
};

export default ${pageName};
`;

// Function to add an import and link to appconfig.js
const updateAppConfig = (pageName) => {
  if (!fs.existsSync(configFilePath)) {
    console.error('appconfig.js not found. Please create it or update manually.');
    return;
  }

  let configContent = fs.readFileSync(configFilePath, 'utf-8');

  // Add import statement if not already present
  const importStatement = `import ${pageName} from './pages/${pageName}';\n`;
  if (!configContent.includes(importStatement)) {
    configContent = importStatement + configContent;
    console.log(`Import for "${pageName}" added to appconfig.js.`);
  } else {
    console.log(`Import for "${pageName}" already exists in appconfig.js.`);
  }

  // Add to `links` array
  const linksPattern = /export const links = \[(\s|\S)*?\];/;
  const linksMatch = configContent.match(linksPattern);

  if (linksMatch) {
    const newLink = `    { label: "${pageName}", path: "/${pageName.toLowerCase()}", component: ${pageName} },\n`;
    const updatedLinks = linksMatch[0].replace('];', `${newLink}];`);
    configContent = configContent.replace(linksPattern, updatedLinks);
    console.log(`Link for "${pageName}" added to appconfig.js.`);
  } else {
    console.error('Could not find `links` array in appconfig.js.');
  }

  // Write the updated config file
  fs.writeFileSync(configFilePath, configContent);
};

// Generate the page
const generatePage = (pageName) => {
  if (!pageName) {
    console.error('Please provide a page name.');
    return;
  }

  const fileName = `${pageName}.jsx`;
  const filePath = path.join(pagesDir, fileName);

  // Check if the file already exists
  if (fs.existsSync(filePath)) {
    console.error(`Page "${pageName}" already exists.`);
    return;
  }

  // Write the new page file
  fs.writeFileSync(filePath, pageTemplate(pageName));
  console.log(`Page "${pageName}" created successfully at ${filePath}`);

  // Update the appconfig.js file
  updateAppConfig(pageName);
};

// Get the page name from command-line arguments
const pageName = process.argv[2];
generatePage(pageName);
