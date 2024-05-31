import React from "react";
import { Link } from "react-router-dom";

function Product404({ props }) {
  return (
    <div className=" flex items-center w-full justify-center mt-12 flex-col">
      <div className=" h-24 my-6 w-24  bg-color_dark_pink shadow-lg shadow-color_pink justify-center flex items-center text-6xl rounded-full text-white">
        <span>{props.symbol}</span>
      </div>
      <h1 className=" text-2xl font-bold">{props.title.toUpperCase()}</h1>
      <p className=" text-sm my-2">{props.para.toUpperCase()}</p>
      <div className="px-4 mb-24 md:w-[40%] mt-2 w-full">
        {props.redirect && (
          <Link to={props.redirect}>
            <button className=" bg-color_dark_pink text-white rounded-sm text-xl font-bold h-16 shadow-lg shadow-color_pink w-full">
              {props.navigate}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Product404;
