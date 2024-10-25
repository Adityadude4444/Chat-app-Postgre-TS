import React from "react";
import Conservationitem from "./Mini-components/Conservationitem";
import { DUMMY_CONVERSATIONS } from "../dummy_data/dummy";

const Conversations = () => {
  return (
    <div className="flex flex-col gap-3 overflow-auto max-h-[500px]">
      {DUMMY_CONVERSATIONS.map((item, index) => (
        <Conservationitem key={index} name={item.fullName} />
      ))}
    </div>
  );
};

export default Conversations;
