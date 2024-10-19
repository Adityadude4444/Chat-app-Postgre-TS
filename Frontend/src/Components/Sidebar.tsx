import React from "react";
import Conversations from "./Conversations";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-6 w-[300px] p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex items-center gap-2">
        <input
          className="p-2 bg-white rounded-lg w-full"
          placeholder="Search..."
        />
        <a href="#">
          <i className="fa-solid fa-magnifying-glass text-gray-600"></i>
        </a>
      </div>
      <Conversations />
      <div className="mt-auto flex gap-2 items-center cursor-pointer p-2 hover:bg-gray-200 rounded-lg">
        <i className="fa-solid fa-right-from-bracket"></i>
        <p className="mb-1">Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;
