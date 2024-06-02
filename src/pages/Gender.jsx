import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../redux/slicers/auth";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiRequest } from "../services/ApiService";
import toast from "react-hot-toast";

function Gender() {
  const dispatch = useDispatch();
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gender === "") {
      toast.error("Please select a gender");
      return;
    }
    apiRequest
      .put("/profile/information", { gender })
      .then((res) => {
        dispatch(fetchUser());
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
  };
  return (
    <div className=" w-full">
      <div className=" md:block hidden">
        <Announcement />
      </div>
      <div className=" md:block hidden">
        <Navbar />
      </div>
      <div className=" h-20 bg-white border-b-[1px] md:border-none w-full md:w-1/3 mx-auto flex items-center  px-4 md:shadow-none shadow-sm">
        <div onClick={() => navigate("/profile")} className="md:hidden">
          <h1 className=" text-xl  font-[600] ">&lt; Gender</h1>
        </div>
      </div>
      <div className=" flex mt-4 md:mt-4  items-start md:w-1/3 md:mx-auto md:border-[1px] md:mb-12 md:border-gray-300 md:rounded-md md:px-4 md:py-6 flex-col">
        <div className="ml-4">
          <h1 className=" font-[600]">Choose Gender</h1>
        </div>

        <select
          onChange={(e) => setGender(e.target.value)}
          name="gender"
          className=" w-[90%] mx-4 cursor-pointer bg-white border-[1px] mt-2 border-gray-300 p-4 outline-none"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <div className="px-4 md:mt-12 mt-96 w-full">
          <button
            onClick={handleSubmit}
            className=" bg-color_dark_pink text-white rounded-sm text-lg font-bold h-16 shadow-lg shadow-color_dark_pink w-full"
          >
            Save
          </button>
        </div>
      </div>
      <div className=" md:block hidden">
        <Footer />
      </div>
    </div>
  );
}

export default Gender;
