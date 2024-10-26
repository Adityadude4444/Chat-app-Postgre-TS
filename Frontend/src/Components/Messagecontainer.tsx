import React, { useContext } from "react";
import Messages from "./Messages";
import { Authcontext } from "../context/Authcontext";
import useConversation from "../zustand/useCoversation";

const Messagecontainer = () => {
  const { selectedConversation } = useConversation();

  return !selectedConversation ? (
    <Notselected />
  ) : (
    <div className="flex flex-col bg-white rounded-lg shadow-lg p-4 w-[700px]">
      <div className="mb-4">
        <span className="text-gray-700 font-semibold">
          To {selectedConversation.fullName}
        </span>
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

const Notselected = () => {
  const { authuser } = useContext(Authcontext);

  return (
    <div className="flex items-center justify-center p-4 w-[700px]">
      <div className="text-lg font-semibold text-gray-700">
        Hello, {authuser?.fullname}
      </div>
    </div>
  );
};

export default Messagecontainer;
