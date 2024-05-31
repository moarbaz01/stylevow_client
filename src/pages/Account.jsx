import { useDispatch } from "react-redux";
import React from "react";
import {
  CiLocationOn,
  CiLogin,
  CiLogout,
  CiShoppingBasket,
  CiUser,
  CiWallet,
} from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutSuccess } from "../redux/slicers/auth";
import MyToaster from "../components/MyToaster";

function Account() {
  const { isUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutSuccess());
  };
  return (
    <div>
      {/* Toaster */}
      <MyToaster />

      {/* Account Section */}
      <div className=" h-20 bg-white border-b-[1px]  w-full flex items-center justify-start px-4 shadow-sm">
        <h1 className=" text-xl font-[600] ">Account</h1>
      </div>
      {/* Links */}
      <div>
        <div className=" mt-0">
          {isUser && (
            <Link
              to="/profile"
              className=" flex items-center hover:bg-pink-100 cursor-pointer p-4"
            >
              <CiUser className=" text-3xl" />
              <span className=" text-lg ml-4 font-[500]">Profile</span>
            </Link>
          )}
          {isUser && (
            <Link
              to="/order"
              className=" flex items-center hover:bg-pink-100 cursor-pointer p-4"
            >
              <CiShoppingBasket className=" text-3xl" />
              <span className=" text-lg ml-4 font-[500]">Order</span>
            </Link>
          )}
          {isUser && (
            <Link
              to="/address"
              className=" flex items-center hover:bg-pink-100 cursor-pointer p-4"
            >
              <CiLocationOn className=" text-3xl" />
              <span className=" text-lg ml-4 font-[500]">Address</span>
            </Link>
          )}
          {isUser && (
            <Link
              to="/payment"
              className=" flex items-center hover:bg-pink-100 cursor-pointer p-4"
            >
              <CiWallet className=" text-3xl" />
              <span className=" text-lg ml-4 font-[500]">Payment</span>
            </Link>
          )}
          {isUser && (
            <Link
              onClick={handleLogout}
              className=" flex items-center hover:bg-pink-100 cursor-pointer p-4"
            >
              <CiLogout className=" text-3xl" />
              <span className=" text-lg ml-4 font-[500]">Log Out</span>
            </Link>
          )}
          {!isUser && (
            <Link
              to="/signup"
              className=" flex items-center hover:bg-pink-100 cursor-pointer p-4"
            >
              <CiUser className=" text-3xl" />
              <span className=" text-lg ml-4 font-[500]">Create Account</span>
            </Link>
          )}
          {!isUser && (
            <Link
              to="/login"
              className=" flex items-center hover:bg-pink-100 cursor-pointer p-4"
            >
              <CiLogin className=" text-3xl" />
              <span className=" text-lg ml-4 font-[500]">Log In</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;