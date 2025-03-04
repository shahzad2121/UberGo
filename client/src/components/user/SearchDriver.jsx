import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { TbLocationFilled } from "react-icons/tb";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { RiArrowDownWideLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const SearchDriver = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="">
        <div className="w-full flex items-center flex-col">
          {/* <h5
            onClick={() => {
              props.setSearchDriverPanelOpen(false);
              props.setConfirmRidePanelOpen(true);
            }}
            className="flex text-center text-3xl items-center"
          >
            <RiArrowDownWideLine />
          </h5> */}

          <h2 className="text-2xl font-semibold ">Meet at the pickup point</h2>
          <div className="py-2 px-2 border-b-[0.1px] border-zinc-400 w-full flex justify-between items-center">
            <div className=" flex justify-center">
              <img
                className="h-28"
                src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                alt=""
              />
            </div>
            <div className="text-right">
              <h2 className="text-lg font-medium text-zinc-500 -mb-1">
                Shahzad
              </h2>
              <h3 className="font-semibold text-2xl -mb-1">ARK:543</h3>
              <p className="font-medium text-zinc-500">Suzuki WagonR</p>
            </div>
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
          {/* <div className="flex gap-6 py-3 border-b-[0.1px] border-zinc-400">
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
              </div> */}
        </div>
        <button onClick={() => {
          navigate('/user/ride')
        }} className="w-full py-2 bg-green-600 text-white rounded-lg font-semibold my-6 text-xl">
          Start
        </button>
      </div>
    </>
  );
};

export default SearchDriver;
