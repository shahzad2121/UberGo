import React, { useContext, useEffect } from "react";
import { userDataContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const { user, setUser } = useContext(userDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/user-login");
    }
  }, [token]);

  return <>{children}</>;
};

export default UserProtectedWrapper;
