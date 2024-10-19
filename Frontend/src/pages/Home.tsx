import React from "react";
import Sidebar from "../Components/Sidebar";
import Messagecontainer from "../Components/Messagecontainer";

export const Home = () => {
  return (
    <div className="flex gap-6 w-full h-[80vh] justify-center max-h-screen p-4">
      <Sidebar />
      <Messagecontainer />
    </div>
  );
};
