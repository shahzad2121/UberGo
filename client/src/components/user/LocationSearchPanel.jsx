import React from "react";
import { IoLocationOutline } from "react-icons/io5";

const LocationSearchPanel = (props) => {
  const locations = [
    "25B Street, Lahore, Pakistan",
    "25B Street, Lahore, Pakistan",
    "25B Street, Lahore, Pakistan",
    "25B Street, Lahore, Pakistan",
    "25B Street, Lahore, Pakistan",
  ];

  return (
    <div className="py-5 flex flex-col gap-7">
      {locations.map((elem, id) => {
        return (
          <div
            key={id}
            onClick={() => {
              props.setVehiclePanelOpen(true);
              props.setPanelOpen(false);
            }}
            className="flex items-center gap-2"
          >
            <p className="flex items-center justify-center p-2 rounded-full bg-zinc-300">
              <IoLocationOutline />
            </p>
            <p>{elem}</p>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
