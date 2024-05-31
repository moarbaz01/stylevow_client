import React, { useState } from "react";
import { CiLock } from "react-icons/ci";
import { Link } from "react-router-dom";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiRequest } from "../services/ApiService";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    apiRequest
      .put("/profile/changePassword", data)
      .then((res) => {
        setError("");
        setSuccess(res.data.message);
      })
      .catch((err) => {
        setSuccess("");
        setError(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };

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
          <h1 className=" text-xl font-[600] ">&lt; Change Password</h1>
        </Link>
      </div>
      <form className=" flex mt-4 md:mt-4  md:w-1/3 md:mx-auto md:border-[1px] md:mb-12 md:border-gray-300 md:rounded-md md:px-4 md:py-6 flex-col">
        <div className=" mx-4">
          <h1 className=" font-[600]">Old Password</h1>
        </div>

        <div className="h-16 w-[90%] mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
          <input
            type="text"
            className="h-12 flex-[3] outline-none"
            placeholder="*********"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <CiLock className=" flex-[1] text-2xl" />
        </div>
        {/* <span className="mx-4 text-xs text-red-500">
        OOPS! your password is not correct
      </span> */}
        <div className="mt-4 mx-4">
          <h1 className=" font-[600]">New Password</h1>
        </div>

        <div className="h-16 w-[90%] mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
          <input
            type="password"
            className="h-12 flex-[3] outline-none"
            placeholder="*********"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <CiLock className=" flex-[1] text-2xl" />
        </div>
        {/* <span className="mx-4 text-xs text-color_dark_pink">
        We Will Send Verification to your new email
      </span> */}
        <div className="mt-4 mx-4">
          <h1 className=" font-[600]">Confirm Password</h1>
        </div>

        <div className="h-16 w-[90%] mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
          <input
            type="password"
            value={confirmPassword}
            className="h-12 flex-[3] outline-none"
            placeholder="*********"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <CiLock className=" flex-[1] text-2xl" />
        </div>
        {error ? (
          <span className="mx-4 text-xs text-color_dark_pink">{error}</span>
        ) : (
          <span className="mx-4 text-xs text-green-500">{success}</span>
        )}

        <div className="px-4 md:mt-12 mt-12 mb-6 w-full">
          <button
            onClick={handleSubmit}
            className=" bg-color_dark_pink text-white rounded-sm text-lg font-bold h-16 shadow-lg shadow-color_dark_pink w-full"
          >
            {loading ? (
              <i className="fa text-white text-lg fa-spinner fa-spin"></i>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
      <div className=" md:block hidden">
        <Footer />
      </div>
    </div>
  );
}

export default ChangePassword;
