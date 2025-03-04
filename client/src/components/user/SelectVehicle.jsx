import React from "react";
import { FaUser } from "react-icons/fa6";
import { RiArrowDownWideLine } from "react-icons/ri";

const SelectVehicle = (props) => {
  return (
    <>
      <div className="w-full">
        <h5
          onClick={() => {
            props.setVehiclePanelOpen(false);
          }}
          className="flex text-center text-3xl items-center"
        >
          <RiArrowDownWideLine />
        </h5>
        <h2 className="text-2xl font-semibold mb-5">Choose your Ride</h2>
      </div>

      <div
        onClick={() => {
          props.setConfirmRidePanelOpen(true);
          props.setVehiclePanelOpen(false)
        }}
        className="flex my-3 items-center py-3 border-2 border-zinc-300 active:border-zinc-900 rounded-lg px-3"
      >
        <img
          className="w-1/3"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />

        <div className="w-1/1">
          <h3 className="font-semibold flex gap-1">
            UberGo <FaUser />
          </h3>
          <h4 className="text-sm">Two mins away</h4>
          <h4 className="text-sm text-zinc-500">Affordable, compact rides</h4>
        </div>

        <div className="text-sm font-semibold">124</div>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanelOpen(true);
          props.setVehiclePanelOpen(false)

        }}
        className="flex my-3 items-center py-3 border-2 border-zinc-300 active:border-zinc-900 rounded-lg px-3"
      >
        <img
          className="w-1/3"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />

        <div className="w-1/1">
          <h3 className="font-semibold flex gap-1">
            UberGo <FaUser />
          </h3>
          <h4 className="text-sm">Two mins away</h4>
          <h4 className="text-sm text-zinc-500">Affordable, compact rides</h4>
        </div>

        <div className="text-sm font-semibold">124</div>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanelOpen(true);
          props.setVehiclePanelOpen(false)

        }}
        className="flex my-3 items-center py-3 border-2 border-zinc-300 active:border-zinc-900 rounded-lg px-3"
      >
        <img
          className="w-1/3"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />

        <div className="w-1/1">
          <h3 className="font-semibold flex gap-1">
            UberGo <FaUser />
          </h3>
          <h4 className="text-sm">Two mins away</h4>
          <h4 className="text-sm text-zinc-500">Affordable, compact rides</h4>
        </div>

        <div className="text-sm font-semibold">124</div>
      </div>
    </>
  );
};

export default SelectVehicle;
