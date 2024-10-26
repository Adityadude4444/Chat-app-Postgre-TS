import React, { useEffect, useState } from "react";
import Conservationitem from "./Mini-components/Conservationitem";
import { ConversationType } from "../zustand/useCoversation";
import Cookies from "js-cookie"; // Import js-cookie to manage cookies

const Conversations = () => {
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  useEffect(() => {
    async function Getconvdata() {
      const token = Cookies.get("jwt"); // Retrieve token from cookies
      try {
        const res = await fetch(
          "http://localhost:5000/api/message/conversations",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setConversations(Array.isArray(data) ? data : []); // Only set data if it’s an array
        } else {
          console.error("Failed to fetch conversations:", await res.text());
          setConversations([]); // Set to empty if response is not ok
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
        setConversations([]); // Set to empty on fetch error
      }
    }
    Getconvdata();
  }, []);

  return (
    <div className="flex flex-col gap-3 overflow-auto max-h-[500px]">
      {conversations.map((item) => (
        <Conservationitem key={item.id} name={item.fullName} />
      ))}
    </div>
  );
};

export default Conversations;
