import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/user/UserLogin";
import UserSignup from "./pages/user/UserSignup";
import CaptainLogin from "./pages/captain/CaptainLogin";
import CaptainSignup from "./pages/captain/CaptainSignup";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
