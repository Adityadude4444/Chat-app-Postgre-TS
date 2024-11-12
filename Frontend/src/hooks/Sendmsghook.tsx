import { useContext, useState } from "react";
import useConversation from "../zustand/useCoversation";
import { Authcontext } from "../context/Authcontext";

const useSendmsg = () => {
  const [isloading, setloading] = useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();
  const { authuser } = useContext(Authcontext);
  const Sendmsg = async (message: string) => {
    setloading(true);
    try {
      console.log(authuser);
      const res = await fetch(
        `http://localhost:5000/api/message/send/${selectedConversation?.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authuser?.token}`,
          },
          credentials: "include",
          body: JSON.stringify({ message }), // Corrected to send the message
        }
      );
      const data = await res.json();
      setMessages([...messages, data]); // Add new message to the existing messages
    } catch (error) {
      console.log("Error sending message:", error);
    } finally {
      setloading(false);
    }
  };

  return { isloading, Sendmsg }; // Correct return
};

export default useSendmsg;
