import React from "react";

const Message = ({ message, type = "info", onClose }) => {
  if (!message) return null; // Don't render if there's no message

  const messageStyles = {
    error: "text-red-500 bg-red-100 border-red-400",
    success: "text-green-500 bg-green-100 border-green-400",
    info: "text-blue-500 bg-blue-100 border-blue-400",
  };

  return (
    <div
      className={`border-l-4 p-4 mb-4 rounded ${messageStyles[type] || ""}`}
      role="alert"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">{type === "error" ? "Error" : "Success"}:</p>
          <p>{message}</p>
        </div>
        {onClose && (
          <button
            className="ml-4 text-xl font-bold"
            onClick={onClose}
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default Message;
