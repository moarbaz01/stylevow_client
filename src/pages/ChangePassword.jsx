import { toast } from "react-hot-toast";
import React, { useRef, useState } from "react";
import { CiLock } from "react-icons/ci";
import { Link } from "react-router-dom";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiRequest } from "../services/ApiService";
import { FaEye } from "react-icons/fa6";
import { IoEye, IoEyeOff } from "react-icons/io5";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  const loadingToastRef = useRef(null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidPassword(newPassword)) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
    } else {
      loadingToastRef.current = toast.loading("Loading...");
      const data = {
        oldPassword,
        newPassword,
        confirmPassword,
      };

      apiRequest
        .put("/profile/changePassword", data)
        .then((res) => {
          toast.success(res.data.message);
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        })
        .finally(() => {
          toast.dismiss(loadingToastRef.current);
        });
    }
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
            type={showOldPassword ? "text" : "password"}
            className="h-12 flex-[3] outline-none"
            placeholder="*********"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          {
            showOldPassword ? (
              <IoEye
                className=" flex-[1] text-2xl cursor-pointer"
                onClick={() => setShowOldPassword(!showOldPassword)}
              />
            ) : (
              <IoEyeOff
                className=" flex-[1] text-2xl cursor-pointer"
                onClick={() => setShowOldPassword(!showOldPassword)}
              />
            )
          }
        </div>
        {/* <span className="mx-4 text-xs text-red-500">
        OOPS! your password is not correct
      </span> */}
        <div className="mt-4 mx-4">
          <h1 className=" font-[600]">New Password</h1>
        </div>

        <div className="h-16 w-[90%] mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
          <input
            type={showNewPassword ? "text" : "password"}
            className="h-12 flex-[3] outline-none"
            placeholder="*********"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {
            showNewPassword ? (
              <IoEye
                className=" flex-[1] text-2xl cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              />
            ) : (
              <IoEyeOff
                className=" flex-[1] text-2xl cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              />
            )
          }
        </div>
        {/* <span className="mx-4 text-xs text-color_dark_pink">
        We Will Send Verification to your new email
      </span> */}
        <div className="mt-4 mx-4">
          <h1 className=" font-[600]">Confirm Password</h1>
        </div>

        <div className="h-16 w-[90%] mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
          <input
            type="text"
            value={confirmPassword}
            className="h-12 flex-[3] outline-none"
            placeholder="*********"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="px-4 md:mt-12 mt-12 mb-6 w-full">
          <button
            onClick={handleSubmit}
            className=" bg-color_dark_pink text-white rounded-sm text-lg font-bold h-16 shadow-lg shadow-color_dark_pink w-full"
          >
            Save
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
