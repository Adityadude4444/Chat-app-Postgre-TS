import React from "react";
import Message from "./Mini-components/Message";

const Messages = () => {
  return (
    <div className="flex flex-col max-h-[500px] overflow-y-auto p-4 gap-2 rounded-lg">
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default Messages;
