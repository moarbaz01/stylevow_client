import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React from "react";
import { CiLock, CiUser } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Announcement from "../components/Announcement";

function PhoneProfile() {
  const { user, isUser } = useSelector((state) => state.auth);
  return (
    isUser && (
      <div>
        <div className=" md:block hidden">
          <Announcement />
        </div>
        <div className=" md:block hidden">
          <Navbar />
        </div>

        <div className=" h-20 bg-white border-b-[1px] md:border-none  w-full md:w-1/3 md:mx-auto flex items-center justify-start  px-4 shadow-sm">
          <Link className="md:hidden block " to="/account">
            <h1 className=" text-xl font-[600] ">&lt; Back</h1>
          </Link>
          <Link className="hidden md:block" to="/">
            <h1 className=" text-xl font-[600] ">&lt; Profile</h1>
          </Link>
        </div>
        {/* Links */}
        <div className=" flex items-start md:w-1/3 md:mx-auto md:border-[1px] md:mb-12 md:border-gray-300 md:rounded-md md:p-2 flex-col">
          <Link
            to="/information"
            className=" flex items-center mt-4 shadow-sm w-full p-4 rounded-sm "
          >
            <img
              className=" h-28 w-28 rounded-full border-[2px] border-color_dark_pink mx-4"
              src={user?.profileImage}
              alt=""
            />
            <div className=" flex items-start flex-col gap-1">
              <h1 className=" text-2xl font-[500]">
                {`${user?.fname} ${user?.lname} `}
              </h1>
              <span>@{user && (user.fname + user.lname).toLowerCase()}</span>
            </div>
          </Link>
          <div className=" mt-4 w-full">
            <Link
              to="/gender"
              className=" flex items-center hover:bg-pink-100 justify-between  cursor-pointer p-4"
            >
              <div className="flex items-center">
                <CiUser className=" text-3xl" />
                <span className=" text-lg ml-4 font-[500]">Gender</span>
              </div>
              <div>{user?.gender || "Set Gender"} &gt;</div>
            </Link>
            {/* <Link
              to="/birthday"
              className=" flex items-center hover:bg-pink-100 justify-between cursor-pointer p-4"
            >
              <div className=" flex items-center">
                <PiCaretCircleDoubleRightThin className=" text-3xl" />
                <span className=" text-lg ml-4 font-[500]">Birthday</span>
              </div>
              <div>2024-12-05 &gt;</div>
            </Link> */}
            {/* <Link
              to="/changeEmail"
              className=" flex items-center hover:bg-pink-100 cursor-pointer justify-between p-4"
            >
              <div className=" flex items-center">
                <CiMail className=" text-3xl" />
                <span className=" text-lg ml-4 font-[500]">Email</span>
              </div>
              <div>{user?.email} &gt;</div>
            </Link> */}
            {/* <Link
              to="/phone"
              className=" flex items-center hover:bg-pink-100 justify-between cursor-pointer p-4"
            >
              <div className=" flex items-center">
                <CiPhone className=" text-3xl" />
                <span className=" text-lg ml-4 font-[500]">Phone</span>
              </div>
              <div>{user?.phone} &gt;</div>
            </Link> */}
            <Link
              to="/changePassword"
              className=" flex items-center hover:bg-pink-100  justify-between cursor-pointer p-4"
            >
              <div className="flex items-center">
                <CiLock className=" text-3xl" />
                <span className=" text-lg ml-4 font-[500]">
                  Change Password
                </span>
              </div>
              <div>******** &gt;</div>
            </Link>
          </div>
        </div>
        {/* Footer */}
        <div className=" md:block hidden">
          <Footer />
        </div>
      </div>
    )
  );
}

export default PhoneProfile;
