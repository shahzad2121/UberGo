import React from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
      </Routes>
    </>
  );
};

export default App;
