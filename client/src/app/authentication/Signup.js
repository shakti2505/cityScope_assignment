import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { Authcontext } from "../context/AuthContext";
import Alert from "react-bootstrap/Alert";
import Loader from "../../utilities/loaders/Loader";

const Signup = () => {
  const navigate = useNavigate();
  const {
    registerInfo,
    updateRegisterinfo,
    registerUser,
    registerError,
    isRegisterLoading,
  } = useContext(Authcontext);
  return (
    <>
      <section className="">
        <div className="flex justify-center items-center mt-16 px-5 ">
          <div className="bg-[#F8F8F2] relative items-center  px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl  rounded-md">
            <button onClick={()=>navigate('/')} className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="25"
                height="25"
              >
                <path
                  fill="#FFFFFF"
                  d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
                />
              </svg>
            </button>

            <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4 ">
              <div className="flex justify-center items-center">
                <img src={logo} className="w-32 h-32 object-cover" />
              </div>
              <div className="flex flex-col">
                <div>
                  <h2 className="text-4xl text-black  font-bold">
                    Sign up free
                  </h2>
                </div>
              </div>
              <form>
                <input
                  value="https://jamstacker.studio/thankyou"
                  type="hidden"
                  name="_redirect"
                />
                <div className="mt-4 space-y-6">
                  <div className="col-span-full">
                    <label className="block mb-3 text-sm font-medium text-gray-600">
                      {" "}
                      Name{" "}
                    </label>
                    <input
                      onChange={(e) =>
                        updateRegisterinfo({
                          ...registerInfo,
                          name: e.target.value,
                        })
                      }
                      value={registerInfo.name}
                      name="name"
                      type="text"
                      placeholder="Full name"
                      className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-full">
                    <label className="block mb-3 text-sm font-medium text-gray-600">
                      {" "}
                      Email{" "}
                    </label>
                    <input
                      value={registerInfo.email}
                      onChange={(e) =>
                        updateRegisterinfo({
                          ...registerInfo,
                          email: e.target.value,
                        })
                      }
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-full">
                    <label className="block mb-3 text-sm font-medium text-gray-600">
                      {" "}
                      Confirm passord{" "}
                    </label>
                    <input
                      onChange={(e) =>
                        updateRegisterinfo({
                          ...registerInfo,
                          password: e.target.value,
                        })
                      }
                      value={registerInfo.password}
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <Alert variant="info">{registerError && registerError}</Alert>
                  <div className="col-span-full">
                    <button
                      disabled={
                        isRegisterLoading ||
                        Object.keys(registerInfo).length == 0
                          ? true
                          : false
                      }
                      onClick={registerUser}
                      type="submit"
                      className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                    >
                      {" "}
                      {isRegisterLoading ? <Loader /> : "Sign up "}
                    </button>
                  </div>
                  <div className="px-8 py-4  text-center">
                    <span className="text-gray-400">
                      Alread have an account?
                    </span>
                    <button
                      onClick={() => navigate("/login")}
                      className="font-medium text-indigo-500 hover:text-indigo-400"
                    >
                      login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
