import React, { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import { FaUser, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import Footer from "../components/Footer";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";
import logo from "../png/s-high-resolution-logo-white.png";
import toast from "react-hot-toast";
import { apiRequest } from "../services/ApiService";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/slicers/auth";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otpSend, setOtpSend] = useState(false);
  const [submitSend, setSubmitSend] = useState(false);
  const notify = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const { isUser } = useSelector((state) => state.auth);
  const termsRef = useRef();
  const loadingToastRef = useRef(null);

  const changeHandler = useCallback((e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const sendotpHandler = useCallback(
    (e) => {
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
    },
    [signupData.email]
  );

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (termsRef.current.checked) {
        if (
          validator.isEmail(signupData.email) &&
          signupData.password === signupData.confirmPassword &&
          signupData.password.length >= 6
        ) {
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
              userLogin();
            })
            .catch((err) => {
              setSubmitSend(false);
              notifyError(err.response.data.message);
            });
        } else {
          if (!validator.isEmail(signupData.email)) {
            notifyError("Please enter a valid email");
          } else if (signupData.password !== signupData.confirmPassword) {
            notifyError("Passwords do not match");
          } else if (signupData.password.length < 6) {
            notifyError("Password must be at least 6 characters long");
          }
        }
      } else {
        notifyError("Please agree to terms and conditions");
      }
    },
    [signupData, userLogin]
  );

  function userLogin() {
    loadingToastRef.current = toast.loading("Redirecting to login page", {});
    apiRequest
      .post("/login", {
        email: signupData.email,
        password: signupData.password,
      })
      .then((res) => {
        dispatch(
          loginSuccess({ user: res.data.user, token: res.data.user.token })
        );
        navigate("/");
        console.log(res.data);
        notify(res.data.message);
      })
      .catch((err) => {
        console.log(err.response.data);
        notifyError(err.response.data.message);
      })
      .finally(() => toast.dismiss(loadingToastRef.current));
  }

  useEffect(() => {
    if (isUser) {
      navigate("/");
    }
  }, [isUser]);

  return (
    <div>
      <Announcement />
      <Navbar />

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
            <div
              className="flex items-center md:pl-2 pt-2 md
:py-4 w-full"
            >
              <input
                id="otpInput"
                className="bg-transparent h-[48px] pl-2 border-gray-200 w-[50%] border-[1px] outline-none "
                type="number"
                name="otp"
                placeholder="4 Digit OTP"
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
                type="password"
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
      <Footer />
    </div>
  );
}

export default Signup;
