import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Start = () => {
  return (
    <div>
      <div className='w-screen h-[70vh] bg-[url("https://images.unsplash.com/photo-1588260369134-d64f66c5730b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRyYWZmaWMlMjBsaWdodHxlbnwwfHwwfHx8Mg%3D%3D")] bg-center bg-no-repeat bg-cover text-2xl text-black font-medium pl-5 pt-5'>
        Uber
      </div>
      <div className="px-5">
        <h3 className="mt-3 mb-5 font-semibold text-2xl">
          Get started with Uber
        </h3>
        <Link
          to="/user-login"
          className="bg-black mb-3 text-white rounded-md items-center justify-between pl-33 pr-5 flex py-2"
        >
          <span className="font-light text-base">As a User</span>

          <FaArrowRightLong />
        </Link>
        <Link
          to="/captain-login"
          className=" bg-zinc-600 text-white rounded-md items-center justify-between pl-33 pr-5 flex py-2"
        >
          <span className="font-light text-base">As a Captain</span>

          <FaArrowRightLong />
        </Link>
      </div>
    </div>
  );
};

export default Start;
