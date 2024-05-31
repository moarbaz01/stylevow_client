import React from "react";
import { PiKeyReturn } from "react-icons/pi";
import { CiDiscount1, CiDeliveryTruck, CiHeadphones } from "react-icons/ci";

function Instructions() {
  return (
    <div className="max-w-[1080px] hidden md:flex  md:items-center grid-cols-2 grid-rows-2 gap-4 px-4 md:py-4 py-2 md:justify-around mx-auto">
      <div className="flex items-center flex-col text-center  gap-1 ">
        <CiDeliveryTruck className="mr-2  text-xl" />
        <span className="text-[12px] md:text-sm text-gray-600">
          Free Shipping
        </span>
      </div>
      <div className="flex items-center flex-col text-center gap-1 ">
        <PiKeyReturn className="mr-2 text-xl" />
        <span className=" text-[12px] md:text-sm text-gray-600">
          10 Days Easy Returns
        </span>
      </div>
      <div className="flex items-center flex-col text-center gap-1 ">
        <CiHeadphones className="mr-2 text-xl" />
        <span className=" text-[12px] md:text-sm text-gray-600">
          24/7 Customer Support
        </span>
      </div>
      <div className="flex items-center flex-col text-center  gap-1">
        <CiDiscount1 className="mr-2 text-xl" />
        <span className=" text-[12px] md:text-sm text-gray-600">
          Member Discount
        </span>
      </div>
    </div>
  );
}

export default Instructions;
