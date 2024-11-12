import React, { useEffect, useState } from "react";
import useSendmsg from "../../hooks/Sendmsghook";

interface MessageProps {
  message: {
    body: string;
    senderid: string;
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [authid, setAuthid] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthId = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/myinfo", {
          credentials: "include",
        });
        const data = await res.json();
        setAuthid(data.id);
      } catch (error) {
        console.error("Error fetching auth id:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchAuthId();
  }, []);

  // Show a loading spinner/message while fetching the auth ID
  if (loading) {
    return <div>Loading...</div>; // Or customize this loading indicator as needed
  }

  // Determine if the message is from the current user
  const fromMe = authid === message.senderid;

  return (
    <div className={`chat ${fromMe ? "chat-end" : "chat-start"}`}>
      <p
        className={`chat-bubble text-white ${
          fromMe ? "bg-blue-500" : "bg-gray-400"
        } text-sm md:text-md`}
      >
        {message.body}
      </p>
      <span className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white"></span>
    </div>
  );
};

export default Message;
