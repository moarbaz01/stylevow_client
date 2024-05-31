import React from "react";
import { CiLock, CiPhone } from "react-icons/ci";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";

function Phone() {
  return (
    <div>
      <div className=" md:block hidden">
        <Announcement />
      </div>
      <div className=" md:block hidden">
        <Navbar />
      </div>
      <div className=" h-20 bg-white border-b-[1px] md:border-none w-full md:w-1/3 md:mx-auto flex items-center justify-start  px-4 md:shadow-none shadow-sm">
        <Link to="/profile">
          <h1 className=" text-xl font-[600] ">&lt; Phone Number</h1>
        </Link>
      </div>
      <form className=" flex mt-4 md:mt-4  md:w-1/3 md:mx-auto md:border-[1px] md:mb-12 md:border-gray-300 md:rounded-md md:px-4 md:py-6 flex-col">
        <div className="mt-4 mx-4">
          <h1 className=" font-[600]">Change Phone Number</h1>
        </div>

        <div className="h-16 w-[90%] mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
          <input
            type="text"
            className="h-12 flex-[3] outline-none"
            placeholder="+184538234"
          />
          <CiPhone className=" flex-[1] text-color_dark_pink text-2xl" />
        </div>
        <span className="mx-4 text-xs text-color_dark_pink">
          We Will Send Verification to your new number
        </span>
        <div className="mt-4 mx-4">
          <h1 className=" font-[600]">Enter OTP</h1>
        </div>

        <div className="h-16 w-[90%] mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
          <input
            type="text"
            className="h-12 flex-[3] outline-none"
            placeholder="One Time Password"
          />
          <CiLock className=" flex-[1] text-2xl" />
        </div>

        <div className="mx-4 mt-16">
          <button className=" bg-color_dark_pink text-white rounded-sm text-xl font-bold h-16 shadow-sm shadow-color_dark_pink w-full">
            Send OTP
          </button>
        </div>
      </form>
      <div className=" md:block hidden">
        <Footer />
      </div>
    </div>
  );
}

export default Phone;
