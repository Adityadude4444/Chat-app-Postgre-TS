import React from "react";
import Messages from "./Messages";

const Messagecontainer = () => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg p-4 w-[700px]">
      <div className="mb-4">
        <span className="text-gray-700 font-semibold">To John</span>
      </div>
      <div className="flex-grow overflow-y-auto">
        <Messages />
      </div>
      <div className="flex items-center gap-2 mt-4">
        <input
          className="p-2 bg-gray-100 rounded-lg w-full"
          placeholder="Type a message..."
        />
        <i className="fa-solid fa-paper-plane text-blue-500 cursor-pointer"></i>
      </div>
    </div>
  );
};

export default Messagecontainer;
