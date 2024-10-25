import React from "react";
import Message from "./Mini-components/Message";
import { DUMMY_MESSAGES } from "../dummy_data/dummy";

const Messages = () => {
  return (
    <div className="flex flex-col max-h-[500px] overflow-y-auto p-4 gap-2 rounded-lg">
      {DUMMY_MESSAGES.map((item) => (
        <Message
          key={item.id} // Use id for unique keys
          message={{
            body: item.body,
            fromMe: item.fromMe,
          }}
        />
      ))}
    </div>
  );
};

export default Messages;
