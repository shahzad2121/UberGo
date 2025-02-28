import React, { useContext, useEffect } from "react";
import { captainDataContext } from "../../context/CaptainContext";
import { useNavigate } from "react-router-dom";

const CaptainProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [captain, setCaptain] = useContext(captainDataContext);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }
  }, [token]);

  return <>{children}</>;
};

export default CaptainProtectWrapper;
