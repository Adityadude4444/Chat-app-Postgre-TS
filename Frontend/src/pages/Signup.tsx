import React from "react";
import GenderCheckbox from "../Components/Mini-components/Genderchec";

const Signup = () => {
  return (
    <div className="flex flex-col items-center gap-5 ">
      <div className=" flex flex-col gap-3 w-[400px]">
        <h1 className="text-5xl text-center font-semibold">Signup</h1>
        <div>
          <label className="label p-2">Full name</label>
          <input className="p-3 bg-white rounded-lg w-full" />
        </div>
        <div>
          <label className="label p-2">Username</label>
          <input className="p-3 bg-white rounded-lg w-full" />
        </div>
        <div>
          <label className="label p-2">Password</label>
          <input className="p-3 bg-white rounded-lg w-full" />
        </div>
        <div>
          <label className="label p-2">Confirm Password</label>
          <input className="p-3 bg-white rounded-lg w-full" />
        </div>
        <GenderCheckbox />
        <a href="#">
          <span>Already have an account?</span>
        </a>
        <button className="p-2 border font-semibold text-lg rounded-lg mt-3 hover:ring-slate-200 hover:ring-1">
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
