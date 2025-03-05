import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/user/UserLogin";
import UserSignup from "./pages/user/UserSignup";
import CaptainLogin from "./pages/captain/CaptainLogin";
import CaptainSignup from "./pages/captain/CaptainSignup";
import Home from "./pages/user/Home";
import UserProtectedWrapper from "./pages/user/userProtectedWrapper";
import CaptainProtectWrapper from "./pages/captain/CaptainProtectWrapper";
import CaptainHome from "./pages/captain/CaptainHome";
import UserLogOut from "./pages/user/UserLogOut";
import CaptainLogout from "./pages/captain/CaptainLogout";
import RideStarted from "./components/user/RideStarted";
import RideMoved from "./pages/captain/RideMoved";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/ride" element={<RideStarted />} />
        <Route path="/captain/login" element={<CaptainLogin />} />
        <Route path="/captain/signup" element={<CaptainSignup />} />
        <Route path="/captain/ride" element={<RideMoved />} />

        <Route
          path="/user/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectedWrapper>
              <UserLogOut />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/captain/home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />
        <Route
          path="/captain/logout"
          element={
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
          }
        />
      </Routes>
    </>
  );
};

export default App;
