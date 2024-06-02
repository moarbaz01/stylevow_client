import React, { useState } from "react";
import { CiDeliveryTruck, CiWallet } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderState] = useState(location?.state);
  return (
    <div>
      <div className=" md:block hidden">
        <Announcement />
      </div>
      <div className=" md:block hidden">
        <Navbar />
      </div>

      <div className="md:my-24">
        <div className=" h-20 bg-white border-b-[1px] md:border-none w-full md:w-1/3 md:mx-auto flex items-center justify-between  px-4 md:shadow-none shadow-sm">
          <h1
            onClick={() =>
              navigate(orderState?.items?.length > 0 ? -1 : "/account")
            }
            className=" text-xl md:hidden font-[600] cursor-pointer "
          >
            &lt; {orderState?.items?.length > 0 ? "Payment Method" : "Payment"}
          </h1>
          <h1
            onClick={() => navigate(orderState?.items?.length > 0 ? -1 : -1)}
            className=" text-xl md:block hidden font-[600] cursor-pointer "
          >
            &lt; {orderState?.items?.length > 0 ? "Payment Method" : "Payment"}
          </h1>
        </div>

        <div className="flex md:mt-6  md:w-1/3 md:mx-auto md:border-[1px] md:mb-16 md:border-gray-300 md:rounded-md md:px-4 md:py-6 flex-col">
          {!orderState?.items?.length > 0 && (
            <Link
              to="/cards"
              className=" flex items-center hover:bg-pink-100 cursor-pointer p-4"
            >
              <CiWallet className=" text-3xl text-color_dark_pink" />
              <span className=" text-lg ml-4 font-[500]">
                Credit Card & Debit
              </span>
            </Link>
          )}
          {orderState?.items?.length > 0 && (
            <Link
              to="/orderConfirm"
              state={{ ...orderState, paymentMethod: "COD" }}
              className=" flex items-center hover:bg-pink-100 cursor-pointer p-4"
            >
              <CiDeliveryTruck className=" text-3xl text-color_dark_pink" />
              <span className=" text-lg ml-4 font-[500]">Cash On Delivery</span>
            </Link>
          )}
        </div>
      </div>
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
}

export default Payment;
