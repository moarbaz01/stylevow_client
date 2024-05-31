import React from "react";
import { Link } from "react-router-dom";

function Banner({ title, data }) {
  return (
    <div className="max-w-[1080px] mx-1 md:mx-auto bg-heroPageBanner shadow-color_pink h-[40vh] md:h-[80vh] flex justify-center items-center bg-cover bg-center bg-no-repeat my-4 rounded-md">
      <div className="flex items-start h-auto p-6 w-[80%] rounded-lg md:rounded-none md:h-full md:w-full justify-center md:pl-16 gap-4 flex-col bg-white_gradient md:bg-transparent">
        <span className=" text-color_dark_pink font-semibold text-xl md:text-4xl">
          New Arrivals
        </span>
        <h1 className="text-3xl md:text-5xl font-[600] w-[40%] ">
          MORDERN CLOTHES
        </h1>
        <p className="text-2xl hidden md:block font-[400] text-gray-400">
          starting at{" "}
          <span className="text-3xl font-bold text-gray-400">₹ 99</span>
        </p>
        <Link to={"/feature"} state={{ title, data }}>
          <button className="bg-color_dark_pink text-white py-2 px-6 rounded-md">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Banner;
