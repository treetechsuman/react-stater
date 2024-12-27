import { useState } from 'react'
import { ThemeProvider } from './components/layout/ThemeContext'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {bottomLinks,links, hiddenLinks} from './appConfig'
import Layout from './components/layout/Layout'
import NotFound from './pages/NotFound'
function App() {
  
  return (
    <ThemeProvider>
    <div className="">
    <Router>
          <Routes>
            {/* Parent route with Layout */}
            <Route path="/" element={<Layout />}>
              {/* Dynamically generate child routes */}
              {links.map((link, index) => (
                <Route
                  key={index}
                  path={link.path === "/" ? "" : link.path.slice(1)} // Adjust for base path
                  element={<link.component />}
                />
              ))}
              {bottomLinks.map((link, index) => (
                <Route
                  key={index}
                  path={link.path === "/" ? "" : link.path.slice(1)} // Adjust for base path
                  element={<link.component />}
                />
              ))}
              {hiddenLinks.map((link, index) => (
                <Route
                  key={index}
                  path={link.path === "/" ? "" : link.path.slice(1)} // Adjust for base path
                  element={<link.component />}
                />
              ))}
              {/* Fallback route for unmatched paths */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
    </div>
    </ThemeProvider>
  )
}

export default App
