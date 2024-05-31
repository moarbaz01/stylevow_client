import React from "react";
import { CiBookmarkPlus } from "react-icons/ci";
import { PiPlus } from "react-icons/pi";

const FilterSearch = ({
  isOpen,
  onClose,
  sizes,
  colors,
  minPrice,
  maxPrice,
  setMaxPrice,
  setMinPrice,
  selectedColors,
  selectedSizes,
  handleSelectSizes,
  handleSelectColors,
}) => {
  if (!isOpen) return null;

  if (isOpen) {
    document.body.style.overflowY = "hidden";
  }

  console.log(colors);

  return (
    <div
      className={`fixed top-0 bg-black/50 z-[2000]  left-0 md:flex items-center justify-center h-screen right-0 bottom-0`}
    >
      <div className="bg-white relative w-full md:w-1/2 h-full overflow-y-scroll md:h-[90%] ">
        <div className=" h-20 bg-white md:hidden border-b-[1px]  w-full flex items-center justify-start px-4 shadow-sm">
          <h1 onClick={onClose} className=" text-xl font-[600] ">
            APPLY
          </h1>
        </div>
        <div onClick={onClose} className="absolute md:block hidden cursor-pointer top-2 right-2">
          <PiPlus className=" rotate-45 text-xl" />
        </div>
        <div className="mt-4 mx-4">
          <h1 className=" font-[600]">Price Range</h1>
        </div>

        <div className="h-16 w-[90%] mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
          <input
            type="text"
            onChange={(e) => setMinPrice(e.target.value)}
            value={minPrice}
            className="h-12  outline-none"
            placeholder="Min"
          />
        </div>
        <div className="h-16 w-[90%] mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
          <input
            type="text"
            className="h-12  outline-none"
            onChange={(e) => setMaxPrice(e.target.value)}
            value={maxPrice}
            placeholder="Max"
          />
        </div>

        {/* Colors */}
        <div className="mt-5 mx-4">
          <h1 className=" font-[600]">Choose Color</h1>
        </div>

        <div className="flex items-center mt-2 flex-wrap mx-4">
          {colors.map((col, index) => {
            return (
              <div
                onClick={() => handleSelectColors(col)}
                key={index}
                style={{ backgroundColor: col }}
                className={`rounded-full ${
                  selectedColors.includes(col) && " border-color_dark_pink"
                } w-12 m-1 h-12 cursor-pointer p-1 border-[2px] `}
              ></div>
            );
          })}
        </div>
        {/* Sizes */}
        <div className="mt-6 mx-4">
          <h1 className=" font-[600]">Choose Size</h1>
        </div>

        <div className="flex items-center mt-2 flex-wrap mx-4">
          {sizes.map((s, index) => {
            return (
              <div
                key={index}
                onClick={() => handleSelectSizes(s)}
                className={` h-16 w-16 ${
                  selectedSizes.includes(s) && " bg-gray-200"
                } m-1 cursor-pointer text-sm flex items-center justify-center border-[1px] border-gray-200`}
              >
                {s.toUpperCase()}
              </div>
            );
          })}
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default FilterSearch;
