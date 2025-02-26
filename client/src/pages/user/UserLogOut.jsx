import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserLogOut = () => {
  const navigate = useNavigate();

  const submitHandler = async () => {
    try {
      const token = localStorage.getItem("token");
  
      const response = await axios.get("http://localhost:8000/v1/users/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });  
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/user/login");
      }
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
    }
  };
  

  return (
    <div className="flex items-center justify-center">
      <button
        className="bg-black text-white px-4 py-2 "
        onClick={submitHandler}
      >
        Logout Now
      </button>
    </div>
  );
};

export default UserLogOut;
