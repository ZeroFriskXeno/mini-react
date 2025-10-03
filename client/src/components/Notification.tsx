import React from "react";

interface Props {
  message: string;
  type?: "success" | "error";
}

const Notification: React.FC<Props> = ({ message, type = "success" }) => {
  if (!message) return null;

  return (
    <div
      className={`p-3 rounded mb-4 text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
