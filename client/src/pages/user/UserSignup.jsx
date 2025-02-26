import React, { useContext, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { userDataContext } from "../../context/UserContext";
import axios from "axios";

const UserSignup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useContext(userDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      password: password,
    };

    const response = await axios.post(
      `http://localhost:8000/v1/users/register`,
      newUser,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 201) {
      console.log(response.data);

      const data = response.data;
      console.log(data.token);

      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/user/home");
    }

    setEmail("");
    setName("");
    setPassword("");
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between pt-8 px-5">
      <div>
        <div className="flex items-center gap-3 mb-7 ">
          <Link onClick={()=>{
            navigate(-1)
          }}>
            <FaArrowLeft />
          </Link>
          <span className="font-semibold text-2xl">User Sign-up</span>
        </div>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="flex flex-col"
          action=""
        >
          <span className="mb-2 text-sm">Name</span>
          <input
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="name"
            placeholder="enter your name"
            className="py-2 text-sm bg-zinc-300 rounded-md px-4 outline-none mb-3"
          />
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
          <button
            className="bg-black mt-5 text-white py-2 rounded-md"
          >
            Sign-up
          </button>
        </form>
        <p className="flex items-center mt-1 gap-1 justify-center text-sm">
          Already have an Account?
          <Link to="/user/login" className="text-blue-700">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
