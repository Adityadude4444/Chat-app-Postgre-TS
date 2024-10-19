import React from "react";

const Message = () => {
  return (
    <>
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-primary bg-blue-500 text-white p-3 rounded-lg shadow-md max-w-xs">
          It's over Anakin,
          <br />I have the high ground.
        </div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble chat-bubble-primary bg-gray-300 text-gray-800 p-3 rounded-lg shadow-md max-w-xs">
          You underestimate my power!
        </div>
      </div>
    </>
  );
};

export default Message;
