import React, { useContext, useState } from "react";
import GenderCheckbox from "../Components/Mini-components/Genderchec";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../context/Authcontext";

const Signup = () => {
  const navigate = useNavigate();
  const { setAuthuser } = useContext(Authcontext);
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmpassword: "",
    gender: "",
  });
  const [isloading, setloading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleGenderChange = (gender: string) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(inputs);
    try {
      setloading(true);
      const res = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setAuthuser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-col gap-3 w-[400px]">
        <h1 className="text-5xl text-center font-semibold">Signup</h1>
        <div>
          <label className="label p-2">Full name</label>
          <input
            name="fullname"
            className="p-3 bg-white rounded-lg w-full"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="label p-2">Username</label>
          <input
            name="username"
            className="p-3 bg-white rounded-lg w-full"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="label p-2">Password</label>
          <input
            name="password"
            type="password"
            className="p-3 bg-white rounded-lg w-full"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="label p-2">Confirm Password</label>
          <input
            name="confirmpassword"
            type="password"
            className="p-3 bg-white rounded-lg w-full"
            onChange={handleInputChange}
          />
        </div>
        <GenderCheckbox
          selectedGender={inputs.gender}
          onGenderChange={handleGenderChange}
        />
        <a
          href="#"
          onClick={() => {
            navigate("/login");
          }}
        >
          <span>Already have an account?</span>
        </a>
        <button
          className="p-2 border font-semibold text-lg rounded-lg mt-3 hover:ring-slate-200 hover:ring-1"
          onClick={handleSubmit}
          disabled={isloading}
        >
          {isloading ? "Loading..." : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default Signup;
