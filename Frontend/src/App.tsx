import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Home } from "./pages/Home";
import { useContext } from "react";
import { Authcontext } from "./context/Authcontext";

export default function App() {
  const { isloading, authuser, setAuthuser } = useContext(Authcontext);
  console.log(authuser);
  return (
    <div className="flex h-screen p-4 items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authuser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authuser ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authuser ? <Login /> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
  );
}
