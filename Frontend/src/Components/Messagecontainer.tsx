import { useContext, useState } from "react";
import Messages from "./Messages";
import { Authcontext } from "../context/Authcontext";
import useConversation from "../zustand/useCoversation";
import useSendmsg from "../hooks/Sendmsghook";

const Messagecontainer = () => {
  const { selectedConversation } = useConversation();
  const { isloading, Sendmsg } = useSendmsg();
  const [smsg, setsmsg] = useState("");

  const handlemsg = async () => {
    if (!smsg.trim()) {
      console.warn("Empty message, skipping send.");
      return;
    }
    console.log("Sending message:", smsg); // Check message content before sending
    await Sendmsg(smsg);
    setsmsg(""); // Clear message input after sending
  };

  return !selectedConversation ? (
    <Notselected />
  ) : (
    <div className="flex flex-col bg-white rounded-lg shadow-lg p-4 w-[700px] h-[600px]">
      {" "}
      {/* Set fixed height for container */}
      <div className="mb-4">
        <span className="text-gray-700 font-semibold">
          To {selectedConversation.fullName}
        </span>
      </div>
      <div className="flex-grow overflow-y-auto">
        {" "}
        {/* Make messages take up available space with scroll */}
        <Messages />
      </div>
      <div className="flex items-center gap-2 mt-4">
        <input
          className="p-2 bg-gray-100 rounded-lg w-full"
          placeholder="Type a message..."
          value={smsg}
          onChange={(e) => {
            setsmsg(e.target.value);
          }}
        />
        <i
          className="fa-solid fa-paper-plane text-blue-500 cursor-pointer"
          onClick={handlemsg}
        ></i>
      </div>
    </div>
  );
};

const Notselected = () => {
  const { authuser } = useContext(Authcontext);

  return (
    <div className="flex items-center justify-center p-4 w-[700px] h-[600px]">
      <div className="text-lg font-semibold text-gray-700">
        Hello, {authuser?.fullname}
      </div>
    </div>
  );
};

export default Messagecontainer;
