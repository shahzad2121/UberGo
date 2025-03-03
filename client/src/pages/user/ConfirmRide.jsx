import React from "react";
import { RiArrowDownWideLine } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { TbLocationFilled } from "react-icons/tb";
import { FaMoneyCheckAlt } from "react-icons/fa";



const ConfirmRide = (props) => {
  return (
    <>
      <div className="">
        <div className="w-full flex items-center flex-col">
          <h5
            onClick={() => {
              props.setConfirmRidePanelOpen(false);
              props.setVehiclePanelOpen(true);
            }}
            className="flex text-center text-3xl items-center"
          >
            <RiArrowDownWideLine />
          </h5>

          <h2 className="text-2xl font-semibold ">
            Let's explore city together
          </h2>

          <div className="py-2 border-b-[0.1px] border-zinc-400 w-full flex justify-center">
            <img
              className="h-34"
              src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
              alt=""
            />
          </div>
        </div>
        <div className="px-2 pb-2">
          <div className="flex gap-6 py-3 border-b-[0.1px] border-zinc-400">
            <div className="flex items-center justify-center text-2xl">
              <FaLocationDot />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold">213/11 A</h2>
              <p className="text-medium font-medium text-zinc-600">
                Niaz Bus Adda, Lahore
              </p>
            </div>
          </div>
          <div className="flex gap-6 py-3 border-b-[0.1px] border-zinc-400">
            <div className="flex items-center justify-center text-2xl">
              <TbLocationFilled />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold">213/11 A</h2>
              <p className="text-medium leading-tight font-medium text-zinc-600">
                1 7th Cross Rd, PWD Quarters, 1st Sector, HSR Layout, Bengaluru,
                Karnataka
              </p>
            </div>
          </div>
          <div className="flex gap-6 py-3">
            <div className="flex items-center justify-center text-2xl">
              <FaMoneyCheckAlt />
            </div>
            <div className="flex flex-col ">
              <h2 className="text-xl font-bold">213/11 A</h2>
              <p className="text-medium font-medium text-zinc-600">Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            props.setSearchDriverPanelOpen(true);
            props.setConfirmRidePanelOpen(false)
          }}
          className="w-full py-2 bg-green-600 text-white rounded-lg font-semibold my-6 text-xl"
        >
          Confirm
        </button>
      </div>
    </>
  );
};

export default ConfirmRide;
