import React, { useEffect } from "react";
import { useFlash } from "./FlashContext";

const FlashMessages = () => {
  const { messages, removeMessage } = useFlash();

  return (
    <div className="p-4">
      {messages.map((msg) => (
        <Message key={msg.id} msg={msg} removeMessage={removeMessage} />
      ))}
    </div>
  );
};

// Separate Message Component to Handle Timers
const Message = ({ msg, removeMessage }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeMessage(msg.id); // Automatically remove after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [msg.id, removeMessage]);

  return (
    <div
      role="alert"
      className={`alert alert-${msg.type} relative min-w-fit p-4 m-1`}
    >
      {msg.message}
      <button
        className="absolute bg-slate-300 top-4 right-1 w-6 h-6 pb-1 flex items-center justify-center text-red-950 text-sm rounded-full"
        onClick={() => removeMessage(msg.id)} // Manually dismiss on click
      >
        x
      </button>
    </div>
  );
};

export default FlashMessages;
