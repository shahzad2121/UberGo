import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../../components/user/LocationSearchPanel";
import SelectVehicle from "../../components/user/SelectVehicle";
import ConfirmRide from "./ConfirmRide";
import SearchDriver from "../../components/user/SearchDriver";

const Home = () => {
  const [pickup, handlePickupChange] = useState("");
  const [destination, handleDestinationChange] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeField, setActiveField] = useState("");
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [searchDriverPanelOpen, setSearchDriverPanelOpen] = useState(false)
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const searchDriverPanelRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault();
    handleDestinationChange("");
    handlePickupChange("");
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
          opacity: 1,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
          opacity: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanelOpen]
  );

  useGSAP(
    function () {
      if (confirmRidePanelOpen) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanelOpen]
  );

  useGSAP(
    function () {
      if (searchDriverPanelOpen) {
        gsap.to(searchDriverPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(searchDriverPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [searchDriverPanelOpen]
  );


  return (
    <div className="h-screen font-['satoshi] relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div className="h-screen w-screen">
        {/* image for temporary use  */}
        <img
          className="w-full h-full object-cover"
          src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png"
          alt=""
        />
        {/* <LiveTracking /> */}
      </div>
      <div className=" flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-6 bg-white rounded-t-lg  relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            className="relative py-3 "
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={(e) => {
                handlePickupChange(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={(e) => {
                handleDestinationChange(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
            // onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-lg my-2 w-full"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPanelOpen={setPanelOpen}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed z-10 bg-white bottom-0 translate-y-full w-full px-3  pt-4 rounded-t-lg"
      >
        <SelectVehicle
          setVehiclePanelOpen={setVehiclePanelOpen}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          setSearchDriverPanelOpen={setSearchDriverPanelOpen}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed z-10 bg-white bottom-0 translate-y-full h-auto w-full px-3  pt-4 rounded-t-lg"
      >
        <ConfirmRide
          setVehiclePanelOpen={setVehiclePanelOpen}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          setSearchDriverPanelOpen={setSearchDriverPanelOpen}
        />
      </div>
      <div
        ref={searchDriverPanelRef}
        className="fixed z-10 bg-white bottom-0 translate-y-full h-auto w-full px-3  pt-4 rounded-t-lg"
      >
        <SearchDriver
          setVehiclePanelOpen={setVehiclePanelOpen}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          setSearchDriverPanelOpen={setSearchDriverPanelOpen}
        />
      </div>
    </div>
  );
};

export default Home;
