import React, { useContext, useEffect, useState } from "react";
import Conservationitem from "./Mini-components/Conservationitem";
import useConversation, { ConversationType } from "../zustand/useCoversation";
import axios, { AxiosResponse } from "axios";
import { Authcontext } from "../context/Authcontext";
// Import for managing selected conversation

const Conversations = () => {
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const { authuser } = useContext(Authcontext);
  const { setSelectedConversation, selectedConversation } = useConversation(); // Zustand store for selected conversation

  useEffect(() => {
    async function Getconvdata() {
      try {
        const res: AxiosResponse<ConversationType[]> = await axios.get(
          "http://localhost:5000/api/message/conversations",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Data fetched:", res.data);
        const filteredConversations = res.data.filter(
          (conversation) => conversation.fullname !== authuser?.fullname
        );

        setConversations(filteredConversations);
      } catch (error) {
        console.error("Error fetching conversations:", error);
        setConversations([]);
      }
    }

    Getconvdata();
  }, [authuser]);

  useEffect(() => {
    console.log("Conversations state updated:", conversations);
  }, [conversations]);

  const handleConversationClick = (conversation: ConversationType) => {
    setSelectedConversation(conversation); // Update the selected conversation in the global store
  };

  return (
    <div className="flex flex-col gap-3 overflow-auto max-h-[500px]">
      {conversations.map((item) => (
        <div
          key={item.id}
          className={`flex items-center gap-5 p-2 hover:bg-gray-200 rounded-lg transition duration-200 ease-in-out cursor-pointer ${
            selectedConversation?.id === item.id ? "bg-sky-500" : ""
          }`}
          onClick={() => handleConversationClick(item)} // Handle click to select conversation
        >
          <Conservationitem key={item.id} name={item.fullname} />
        </div>
      ))}
    </div>
  );
};

export default Conversations;
