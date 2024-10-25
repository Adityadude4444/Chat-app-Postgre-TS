import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../context/Authcontext";

const Login = () => {
  const navigate = useNavigate();
  const { setAuthuser } = useContext(Authcontext);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  async function Login() {
    const { username, password } = inputs; // destructure username and password
    try {
      console.log(inputs);
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }
      console.log("Login successful:", data);
      setAuthuser(data);
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <div className="flex flex-col items-center gap-5 ">
      <div className="flex flex-col gap-3 w-[400px]">
        <h1 className="text-5xl text-center font-semibold">Login</h1>
        <div>
          <label className="label p-2">Username</label>
          <input
            className="p-3 bg-white rounded-lg w-full"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
        </div>
        <div>
          <label className="label p-2">Password</label>
          <input
            className="p-3 bg-white rounded-lg w-full"
            type="password"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
        </div>
        <a
          href="#"
          onClick={() => {
            navigate("/signup");
          }}
        >
          <span>Don't have an account?</span>
        </a>
        <button
          className="p-2 border font-semibold text-lg rounded-lg mt-3 hover:ring-slate-200 hover:ring-1"
          onClick={Login} // call Login function here
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
