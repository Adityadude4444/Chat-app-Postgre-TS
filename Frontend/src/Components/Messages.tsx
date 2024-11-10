import Message from "./Mini-components/Message";
import { useEffect, useContext } from "react";
import useConversation from "../zustand/useCoversation";
import { Authcontext } from "../context/Authcontext"; // Assuming Authcontext provides auth details

const Messages = () => {
  const { selectedConversation, setMessages, messages } = useConversation();
  const { authuser } = useContext(Authcontext); // Accessing auth user details from context

  useEffect(() => {
    async function Getconvdata() {
      if (!selectedConversation || !authuser) {
        console.log("No conversation or user available");
        return; // Exit if no conversation or user
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/message/${selectedConversation?.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authuser.token}`,
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        setMessages(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      }
    }

    Getconvdata();
  }, [selectedConversation, authuser, setMessages]); // Re-fetch messages when selectedConversation or authuser changes

  return (
    <div className="flex flex-col max-h-[500px] overflow-y-auto p-4 gap-2 rounded-lg">
      {messages.map((item) => (
        <Message
          key={item.id} // Use id for unique keys
          message={{
            body: item.body,
            senderid: item.senderid,
          }}
        />
      ))}
    </div>
  );
};

export default Messages;
