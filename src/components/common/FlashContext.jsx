import React, { createContext, useContext, useState } from "react";

const FlashContext = createContext();

export const FlashProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message, type = "info") => {
    setMessages((prev) => [...prev, { id: Date.now(), message, type }]);
  };

  const removeMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <FlashContext.Provider value={{ messages, addMessage, removeMessage }}>
      {children}
    </FlashContext.Provider>
  );
};

export const useFlash = () => useContext(FlashContext);
