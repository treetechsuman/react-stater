# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


  # React Starter Kit Documentation

Welcome to the **React Starter Kit**! Follow the steps below to set up and start using this project efficiently.

---

## **Installation**

1. **Clone the Repository**  
   Clone the project from the GitHub repository:  
   ```bash
   git clone https://github.com/treetechsuman/react-stater.git
   ```

2. **Navigate to the Project Directory**  
   ```bash
   cd react-stater
   ```

3. **Install Dependencies**  
   Install the required dependencies:  
   ```bash
   npm install
   ```

4. **Run the Development Server**  
   Start the development server:  
   ```bash
   npm run dev
   ```
   Access the application at:  
   **http://192.168.-.---:5173**

---

## **Configuration**

### App Settings
Configure application settings in the `appConfig.js` file located in the `src` folder. 

### Icons
For icons, visit: **[Heroicons](https://heroicons.com/)**.


```

---

## **Page and Component Generation**

### Generating a New Page
To generate a new page, run the following command:  
```bash
npm run generate:page PageName
```

#### What This Command Does:
1. Creates a new page in the `src/pages` directory.
2. Automatically imports the page into `appConfig.js`.
3. Adds routing links to `appConfig.js`.

#### Result:
Once the command is run, a new link will appear in the top navigation bar with routing integrated.

---

### Generating a New Component
To generate a new component, use the following command:  
```bash
npm run generate:component common/ComponentName
```

#### What This Command Does:
1. Creates a `ComponentName` component in the `components/common` folder.

#### Custom Component Directory:
If you want to create a component inside a custom folder, use the following syntax:  
```bash
npm run generate:component custom/ComponentName
```

---

## **Development Workflow**

1. Set up the server using the steps above.
2. Generate pages and components as needed.
3. Configure app settings in `appConfig.js`.
4. Customize as per your requirements.

**Enjoy! 🎉**

