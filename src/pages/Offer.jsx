import React from "react";
import Product404 from "../components/Product404";

function Offer() {
  return (
    <div>
      <div className=" h-20 bg-white border-b-[1px]  w-full flex items-center justify-start px-4 shadow-sm">
        <h1 className=" text-xl font-[600] ">Offers</h1>
      </div>

      {/* Not Found */}
      <div className="justify-center mt-8 w-full px-2 flex-col flex">
      <Product404
        props={{
          symbol: "x",
          title: "Offers Not Available",
          navigate: "Back To Home",
          para: "No Offers",
          redirect: "/",
        }}
      />
      </div>
    </div>
  );
}

export default Offer;
