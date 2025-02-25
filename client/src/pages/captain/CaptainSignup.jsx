import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState();
  const [vehicleType, setVehicleType] = useState();
  const [vehiclePlate, setVehiclePlate] = useState();
  const [vehicleCapacity, setVehicleCapacity] = useState();
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      email: email,
      password: password,
      name: name,
      vehicle: {
        capacity: vehicleCapacity,
        color: vehicleColor,
        plate: vehiclePlate,
        type: vehicleType,
      },
    });

    setEmail("");
    setPassword("");
    setName("");
    setVehicleColor("");
    setVehicleType("");
    setVehiclePlate("");
    setVehicleCapacity("");
  };

  useEffect(() => {
    console.log(captainData);
  }, [captainData]);

  return (
    <div className="w-screen h-screen flex flex-col justify-between pt-5 px-5">
      <div>
        <div className="flex items-center gap-3 mb-7 ">
          <Link to="/">
            <FaArrowLeft />
          </Link>
          <span className="font-semibold text-2xl">Captain Sign-up</span>
        </div>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="flex flex-col"
          action=""
        >
          <span className="mb-1 text-sm">Name</span>
          <input
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="name"
            placeholder="enter your name"
            className="py-2 text-sm bg-zinc-300 rounded-md px-4 outline-none mb-2"
          />
          <span className="mb-1 text-sm">Email</span>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="enter your email"
            className="py-2 text-sm bg-zinc-300 rounded-md px-4 outline-none mb-2"
          />
          <span className="mb-1 text-sm">Password</span>
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="enter your password"
            className="py-2 text-sm bg-zinc-300 rounded-md px-4 outline-none mb-2"
          />
          <span className="mb-1 text-sm">Vehicle Type</span>
          <select
            required
            value={vehicleType}
            onChange={(e) => {
              setVehicleType(e.target.value);
            }}
            className="py-2 text-sm bg-zinc-300 rounded-md px-4 outline-none mb-2"
          >
            <option value="" disabled>
              set vehicle type
            </option>
            <option value="car">car</option>
            <option value="auto">auto</option>
            <option value="bike">bike</option>
          </select>
          <span className="mb-1 text-sm">Vehicle Capacity</span>
          <input
            required
            value={vehicleCapacity}
            onChange={(e) => {
              setVehicleCapacity(e.target.value);
            }}
            type="password"
            placeholder="enter your vehicle capacity"
            className="py-2 text-sm bg-zinc-300 rounded-md px-4 outline-none mb-2"
          />
          <span className="mb-1 text-sm">Vehicle Color</span>
          <input
            required
            value={vehicleColor}
            onChange={(e) => {
              setVehicleColor(e.target.value);
            }}
            type="text"
            placeholder="enter your vehicle color"
            className="py-2 text-sm bg-zinc-300 rounded-md px-4 outline-none mb-2"
          />
          <span className="mb-1 text-sm">vehiclePlate</span>
          <input
            required
            value={vehiclePlate}
            onChange={(e) => {
              setVehiclePlate(e.target.value);
            }}
            type="text"
            placeholder="enter your vehicle plate"
            className="py-2 text-sm bg-zinc-300 rounded-md px-4 outline-none mb-2"
          />

          <button className="bg-black mt-5 text-white py-2 rounded-md">
            Sign-up
          </button>
        </form>
        <p className="flex items-center mt-1 gap-1 justify-center text-sm">
                  Already have an Account?
                  <Link to="/captain-login" className="text-blue-700">
                    Login here
                  </Link>
                </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
