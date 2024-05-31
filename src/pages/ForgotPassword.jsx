import React, { useState } from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { apiRequest } from "../services/ApiService";
import MyToaster from "../components/MyToaster";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const notify = (message) => toast.success(message);
  const errNotify = (message) => toast.error(message);
  const [loading, setLoading] = useState(false);

  // Change Handler
  function changeHandler(e) {
    setEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    apiRequest
      .post("/profile/generateResetLink", { email })
      .then((res) => {
        notify(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        errNotify(err.response.data.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <MyToaster />
      <div className=" md:block hidden">
        <Announcement />
      </div>
      <div className=" md:block hidden">
        <Navbar />
      </div>

      {/* Center of page */}
      <div className="flex md:bg-gray-200 md:py-6 py-12 mx-auto">
        <div className="flex items-center md:w-[40%] w-full mx-auto py-8 px-4 bg-white rounded-sm flex-col ">
          {/* <div className=" h-24 w-24 rounded-lg bg-black p-2 flex items-center justify-center">
            <img className="" src={logo} alt="" />
          </div> */}
          <h1 className="text-lg my-2 font-[600]">Forgot Password</h1>
          {/* <p className="mb-2 text-sm font-[400] text-gray-400">
            Forgot Password
          </p> */}
          <form className="flex items-start w-full md:w-[80%] gap-4 my-2 flex-col">
            <div className="flex items-center md:border-b-[0.5px] border-[1px] pl-2  border-gray-200 py-2   md:py-4 w-full">
              <MdEmail className="mr-2" />
              <input
                className="bg-transparent w-full h-[48px] border-none outline-none "
                type="email"
                name="email"
                placeholder="Email"
                onChange={changeHandler}
              />
            </div>
            <div className=" w-full px-4">
              <button
                onClick={handleSubmit}
                className=" bg-black cursor-pointer hover:opacity-80 text-white font-[500] h-[57px] py-2 my-2 w-full "
              >
                {loading ? (
                  <i className="fa text-white text-lg fa-spinner fa-spin"></i>
                ) : (
                  "Send Link"
                )}
              </button>
            </div>
          </form>

          <div className="flex items-center md:flex-col mt-4 flex-col-reverse justify-between w-full md:w-[80%]">
            <Link to={"/signup"} className="text-sm">
              Create an new account?{" "}
              <span className=" text-color_dark_pink font-bold">sign up</span>
            </Link>
            <Link to={"/"}>Go to Home</Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className=" hidden md:block">
        <Footer />
      </div>
    </div>
  );
}

export default ForgotPassword;
