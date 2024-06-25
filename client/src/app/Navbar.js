import React, { useContext } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "./context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("User"));
  const { logout } = useContext(Authcontext);
  return (
    <div className="flex flex-row">
      <div className="flex justify-between items-center w-full px-5">
        <img alt="" src={logo} className="w-16 h-16 object-cover" />
        {/* <div className="flex  gap-3">
          <button
            onClick={() => navigate("/signup")}
            className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
          >
            Sign up free
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-[#fff] border-2 border-[#3e3e3e] rounded-lg text-dark px-6 py-3 text-base hover:border-[#3e3e3e] cursor-pointer transition"
          >
            Login
          </button>
        </div> */}
        {user ? (
          <div className="flex items-center gap-3">
            <p className="text-xl font-bold">{user.name}</p>
            <button
              onClick={logout}
              className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
            >
              <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>
              <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                Logout
              </div>
            </button>
          </div>
        ) : (
          <div className="flex  gap-3">
            <button
              onClick={() => navigate("/signup")}
              className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
            >
              Sign up free
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-[#fff] border-2 border-[#3e3e3e] rounded-lg text-dark px-6 py-3 text-base hover:border-[#3e3e3e] cursor-pointer transition"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
