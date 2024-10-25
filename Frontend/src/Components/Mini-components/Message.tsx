import React from "react";

interface MessageProps {
  message: {
    body: string;
    fromMe: boolean;
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { body, fromMe } = message;
  const chatClass = fromMe ? "chat-end" : "chat-start";
  const bubbleBg = fromMe ? "bg-blue-500" : "bg-gray-400";

  return (
    <div className={`chat ${chatClass}`}>
      <p className={`chat-bubble text-white ${bubbleBg} text-sm md:text-md`}>
        {body}
      </p>
      <span className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white"></span>
    </div>
  );
};

export default Message;
