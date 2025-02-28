import React, { useContext } from "react";
import { captainDataContext } from "../../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainLogout = () => {
  const navigate = useNavigate();
  const [captain, setCaptain] = useContext(captainDataContext);
  const submitHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      
      const response = await axios.get("http://localhost:8000/v1/captains/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });  
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/captain/login");
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

export default CaptainLogout;
