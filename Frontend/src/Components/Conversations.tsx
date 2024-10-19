import React from "react";
import Conservationitem from "./Mini-components/Conservationitem";

const Conversations = () => {
  return (
    <div className="flex flex-col gap-3 overflow-auto max-h-[300px]">
      <Conservationitem />
      <Conservationitem />
      <Conservationitem />
    </div>
  );
};

export default Conversations;
