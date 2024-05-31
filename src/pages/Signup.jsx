import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import { FaUser, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import Footer from "../components/Footer";
import validator from "validator";
// import google from "../assets/images/logo/google.png";
// import facebook from "../assets/images/logo/facebook.png";
import { Link } from "react-router-dom";
import logo from "../png/s-high-resolution-logo-white.png";
import toast from "react-hot-toast";
import MyToaster from "../components/MyToaster";
import { apiRequest } from "../services/ApiService";

function Signup() {
  const [signupData, setSignupData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    otp: "",
  });
  const [otpSend, setOtpSend] = useState(false);
  const [submitSend, setSubmitSend] = useState(false);
  const notify = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  function changeHandler(e) {
    const { name, value } = e.target;
    setSignupData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const termsRef = useRef();
  function submitHandler(e) {
    e.preventDefault();
    if (termsRef.current.checked) {
      setSubmitSend(true);

      const { otp, ...other } = signupData;
      apiRequest
        .post("/signup", {
          otp: parseInt(otp),
          ...other,
        })
        .then((res) => {
          setSubmitSend(false);
          notify(res.data.message.toUpperCase());
        })
        .catch((err) => {
          setSubmitSend(false);
          notifyError(err.response.data.message);
        });
    } else {
      notifyError("Please agree to terms and conditions");
    }
  }
  function sendotpHandler(e) {
    e.preventDefault();
    if (validator.isEmail(signupData.email)) {
      setOtpSend(true);

      apiRequest
        .post("/otp", { email: signupData.email })
        .then((_) => {
          setOtpSend(false);
          notify("OTP Successfully Sent");
        })
        .catch((err) => {
          setOtpSend(false);
          notifyError(err.response.data.message);
        });
    } else {
      notifyError("Please enter a valid email");
    }
  }

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
      <div className="flex md:bg-gray-200 py-6">
        <div className="flex items-center w-full md:w-[40%] mx-auto py-8 bg-white rounded-sm flex-col justify-center">
          <div className=" h-24 w-24 rounded-lg bg-black p-2 flex items-center justify-center">
            <img className="" src={logo} alt="" />
            {/* STYLEVOW */}
          </div>
          <h1 className="text-lg my-2 font-[600]">Let`s Started</h1>
          <p className="mb-2 text-sm font-[400] text-gray-400">
            Sign up to continue
          </p>
          {/* Form */}
          <form className="flex items-start w-[90%] md:w-[80%] gap-4 my-2 flex-col">
            <div className="flex items-center md:border-b-[0.5px] border-[1px] pl-2  border-gray-200 py-2   md:py-4 w-full">
              <FaUser className="mr-2" />
              <input
                className="bg-transparent w-full h-[48px] border-none outline-none  "
                type="text"
                name="fname"
                placeholder="First name"
                onChange={changeHandler}
                value={signupData.fname}
              />
            </div>
            <div className="flex items-center md:border-b-[0.5px] border-[1px] pl-2  border-gray-200 py-2   md:py-4 w-full">
              <FaUser className="mr-2" />
              <input
                className="bg-transparent w-full h-[48px] border-none outline-none  "
                type="text"
                name="lname"
                placeholder="Last name"
                onChange={changeHandler}
                value={signupData.lname}
              />
            </div>

            <div className="flex items-center md:border-b-[0.5px] border-[1px] pl-2  border-gray-200 py-2  md:py-4 w-full">
              <FaPhone className="mr-2" />
              <input
                className="bg-transparent w-full h-[48px] border-none outline-none "
                type="phone"
                name="phone"
                placeholder="+91 Phone Number"
                onChange={changeHandler}
                value={signupData.phone}
              />
            </div>

            <div className="flex items-center md:border-b-[0.5px] border-[1px] pl-2  border-gray-200 py-2   md:py-4 w-full">
              <MdEmail className="mr-2" />
              <input
                className="bg-transparent w-full h-[48px] border-none outline-none "
                type="email"
                name="email"
                placeholder="Email"
                onChange={changeHandler}
                value={signupData.email}
              />
            </div>

            {/*  */}
            <div className="flex items-center md:pl-2 pt-2 md:py-4 w-full">
              <input
              id="otpInput"
                className="bg-transparent h-[48px] pl-2 border-gray-200 w-[50%] border-[1px] outline-none "
                type="number"
                name="otp"
                placeholder="6 Digit OTP"
                onChange={changeHandler}
                value={signupData.otp}
              />

              <button
                onClick={sendotpHandler}
                className="h-[48px] ml-2 hover:opacity-80 bg-color_dark_pink text-white w-32"
              >
                {otpSend ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Send OTP"
                )}
              </button>
            </div>

            {/*  */}
            <div className="flex items-center md:border-b-[0.5px] border-[1px] pl-2  border-gray-200 py-2 md:py-4 w-full">
              <TbPassword className="mr-2" />
              <input
                className="bg-transparent h-[48px] w-full border-none outline-none "
                type="password"
                name="password"
                placeholder="Password"
                onChange={changeHandler}
                value={signupData.password}
              />
            </div>
            {/*  */}
            <div className="flex items-center md:border-b-[0.5px] border-[1px] pl-2  border-gray-200 py-2  md:py-4 w-full">
              <TbPassword className="mr-2" />
              <input
                className="bg-transparent h-[48px] w-full border-none outline-none"
                type="text"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={changeHandler}
                value={signupData.confirmPassword}
              />
            </div>
            {/*  */}
            <div className="flex items-center my-2 gap-2">
              <input type="checkbox" ref={termsRef} name="agree" />
              <span className="text-sm">
                Accept our{" "}
                <span className="text-color_dark_pink">
                  Terms and Conditions
                </span>
              </span>
            </div>
            <div className=" w-full px-4">
              <button
                onClick={submitHandler}
                className=" bg-black cursor-pointer hover:opacity-80 text-white font-[500] h-[57px] py-2 my-2 w-full "
              >
                {submitSend ? (
                  <i className="fa text-white text-lg fa-spinner fa-spin"></i>
                ) : (
                  "SIGN UP"
                )}
              </button>
            </div>
          </form>

          <Link className="md:hidden" to={"/"}>
            Go to Home
          </Link>
          <Link to={"/login"} className="text-sm my-2">
            Already have an account?{" "}
            <span className=" text-color_dark_pink font-[400]">sign in</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className=" md:block hidden">
        <Footer />
      </div>
    </div>
  );
}

export default Signup;
