import React, { useContext } from "react";
import Conversations from "./Conversations";
import { Authcontext } from "../context/Authcontext";

const Sidebar = () => {
  const { setAuthuser } = useContext(Authcontext);
  async function Logout() {
    try {
      const res = await fetch("http://localhost:5000/api/user/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setAuthuser(null);
      alert("You Logged out");
    } catch (error) {
      console.log(error);
    }
  }
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
      <div
        className="mt-auto flex gap-2 items-center cursor-pointer p-2 hover:bg-gray-200 rounded-lg"
        onClick={Logout}
      >
        <i className="fa-solid fa-right-from-bracket"></i>
        <p className="mb-1">Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;
