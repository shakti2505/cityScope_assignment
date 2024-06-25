import React, { useContext } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./app/authentication/Login.js";
import Signup from "./app/authentication/Signup.js";
// import Home from "./app/home/Home.js";
import { CreatorContextProvider } from "./app/context/CreatorContext.js";
import CreatorProfile from "./app/creator/CreatorProfile.js";
import OfferingPage from "./app/creator/OfferingPage.js";
import Protected from './app/Protected.js'
const Home = React.lazy(() => import("./app/home/Home.js"));

function App() {
  return (
    <CreatorContextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
              path="/"
              element={
                <React.Suspense>
                {<Home/>}
                </React.Suspense>
              }
            />
        <Route path="/creator/:id" element={<Protected Component={CreatorProfile} />} />
        <Route path="/:id/:courseId" exact element={<Protected Component={OfferingPage} />} />
      </Routes>
    </CreatorContextProvider>
  );
}

export default App;
