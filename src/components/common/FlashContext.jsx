import React, { createContext, useContext, useState } from "react";
import { appSettings } from "../../appConfig";

const FlashContext = createContext();

export const FlashProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const isDevelopment = appSettings.isDevelopment;
  const addMessage = (message, type = "info") => {
    //setMessages((prev) => [...prev, { id: Date.now(), message, type }]);
    setMessages((prev) => {
      if (prev.some((msg) => msg.message === message && msg.type === type)) {
        return prev; // Avoid duplicate messages
      }
      return [...prev, { id: Date.now(), message, type }];
    });
  };

  const removeMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <FlashContext.Provider
      value={{ messages, addMessage, removeMessage, isDevelopment }}
    >
      {children}
    </FlashContext.Provider>
  );
};

export const useFlash = () => useContext(FlashContext);
