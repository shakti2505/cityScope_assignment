import { createContext, useState, useCallback } from "react";
import BASE_URL_API from "../../utilities/baseURL";
import { apiVariables } from "../../utilities/apiVariables";
import { postRequest } from "../../utilities/utilities";
import { useNavigate } from "react-router-dom";

export const Authcontext = createContext();
export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState({});
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registeredUser, setRegisteredUser] = useState([]);
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({});
  const [loggedInUser, setLoggedInUser] = useState([]);

  const updateRegisterinfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLogininfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsRegisterLoading(true);
      setRegisterError(null);

      try {
        const response = await postRequest(
          `${BASE_URL_API}${apiVariables.signup.url}`,
          registerInfo
        );

        if (response.status === 201) {
          // User registered successfully
          localStorage.setItem("User", JSON.stringify(response.data.user));
          setRegisterInfo(null);
          setRegisteredUser(response.data.user);
          setIsRegisterLoading(true);
          navigate("/login");
        } else if (response.status === 500) {
          // Server error
          setRegisterError("Server error. Please try again later.");
        } else if (response.status === 200) {
          setIsRegisterLoading(false);
          setRegisterInfo({ name: "", email: "", password: "" });
          // User already registered
          setRegisterError(response.data.message);
        } else {
          setIsRegisterLoading(false);
          // Unexpected status code
          setRegisterError(
            "Unexpected error occurred. Please try again later."
          );
        }
      } catch (error) {
        setIsRegisterLoading(false);
        // Catch any network errors
        setRegisterError("All fields are required");
      }
    },
    [registerInfo]
  );

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);

      try {
        const response = await postRequest(
          `${BASE_URL_API}${apiVariables.login.url}`,
          loginInfo
        );

        if (response.status === 200) {
          // User registered successfully
          localStorage.setItem(
            "User",
            JSON.stringify(response.data.loggedInUser)
          );
          setLoginInfo({ email: "", password: "" });

          setLoggedInUser(response.data.loggedInUser);
          setTimeout(() => {
            setIsLoginLoading(true);
            navigate("/");
          }, 2000);
        } else {
          setIsLoginLoading(false);
          // Unexpected status code
          setLoginError(response.data.message);
        }
      } catch (error) {
        console.log(error);
        setIsLoginLoading(false);
        // setLoginInfo({ email: "", password: "" });
        // User already registered
        setLoginError(error.response.data.message); // Catch any network errors
        setRegisterError("All fields are required");
      }
    },
    [loginInfo]
  );

  const logout = useCallback(async () => {

    try {
      const response = await postRequest(
        `${BASE_URL_API}${apiVariables.logout.url}`
      );
      if (response.status == 200) {
        localStorage.removeItem("User");
        navigate('/')
        alert("logged out successfully!")
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Authcontext.Provider
      value={{
        registerInfo,
        updateRegisterinfo,
        registerUser,
        isRegisterLoading,
        registerError,
        registeredUser,
        loginUser,
        loginError,
        isLoginLoading,
        updateLogininfo,
        loginInfo,
        logout
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};
