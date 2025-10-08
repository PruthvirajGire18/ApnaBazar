import React from "react";
import { UseAppContext } from "../context/AppContext";

const Login = ({ setShowUserLogin }) => {
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleClose = () => setShowUserLogin(false);
  const {setUser}=UseAppContext();
  const handleSubmit=(e)=>{
    e.preventDefault();
    setUser({
        email:"girepruthviraj@gmail.com",
        name:"Pruthviraj"
    })
    setShowUserLogin(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm pt-16">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-start p-8 py-12 w-80 sm:w-[352px] text-gray-700 rounded-lg shadow-xl border border-gray-200 bg-white relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <p className="text-2xl font-medium m-auto">
          <span className="text-green-500">Apna Bazar</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500"
            type="password"
            required
          />
        </div>

        {state === "register" ? (
          <p className="text-sm">
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-green-500 cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-green-500 cursor-pointer"
            >
              click here
            </span>
          </p>
        )}

        <button className="bg-green-500 hover:bg-green-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
