import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import axios from "axios";
import { userDataContext } from "../../context/UserContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const [user, setUser] = useContext(userDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const existUser = { email, password };
    const response = await axios.post(
      "http://localhost:8000/v1/users/login",
      existUser
    );
    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between pt-8 px-5">
      <div>
        <div className="flex items-center gap-3 mb-7 ">
          <Link to="/">
            <FaArrowLeft />
          </Link>
          <span className="font-semibold text-2xl">User Login</span>
        </div>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="flex flex-col"
          action=""
        >
          <span className="mb-2 text-sm">Email</span>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="enter your email"
            className="py-2 text-sm bg-zinc-300 rounded-md px-4 outline-none mb-3"
          />
          <span className="mb-2 text-sm">Password</span>
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="enter your password"
            className="py-2 bg-zinc-300 rounded-md px-4 outline-none"
          />
          <button className="bg-black mt-5 text-white py-2 rounded-md">
            Login
          </button>
        </form>
        <p className="flex items-center mt-3 gap-1 justify-center text-sm">
          New here?
          <Link to="/user-signup" className="text-blue-700">
            Create new account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
