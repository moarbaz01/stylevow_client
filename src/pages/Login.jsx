import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { TbPassword } from "react-icons/tb";
import logo from "../png/s-high-resolution-logo-white.png";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../redux/slicers/auth";
import toast from "react-hot-toast";
import { apiRequest } from "../services/ApiService";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUser } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const notify = (message) => toast.success(message);
  const errNotify = (message) => toast(message);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Change Handler
  function changeHandler(e) {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  }

  const saveData = (e) => {
    e.preventDefault();
    setLoading(true);
    // Post data
    const payload = {
      email,
      password,
    };
    apiRequest
      .post("/login", payload)
      .then((res) => {
        setLoading(false);
        dispatch(
          loginSuccess({ user: res.data.user, token: res.data.user.token })
        );
        notify(res.data.message);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data && err.response.data.message) {
          // If error response has expected structure
          errNotify(err.response.data.message);
          console.error("Error response:", err.response.data.message);
          dispatch(loginFailure(err.response.data.message));
        } else {
          // If error response has unexpected structure or is undefined
          console.error(
            "Unexpected error structure or undefined response:",
            err
          );
          errNotify("An unexpected error occurred.");
          dispatch(loginFailure("An unexpected error occurred."));
        }
      });
  };

  useEffect(() => {
    if (isUser) {
      navigate("/");
    }
  });

  return (
    <div>
      <div className=" md:block hidden">
        <Announcement />
      </div>
      <div className=" md:block hidden">
        <Navbar />
      </div>

      {/* Center of page */}
      <div className="flex md:bg-gray-200 md:py-6 py-12 mx-auto">
        <div className="flex items-center md:w-[40%] w-full mx-auto py-8 px-4 bg-white rounded-sm flex-col justify-center">
          <div className=" h-24 w-24 rounded-lg bg-black p-2 flex items-center justify-center">
            <img className="" src={logo} alt="" />
            {/* STYLEVOW */}
          </div>
          <h1 className="text-lg my-2 font-[600]">Welcome to Stylevow</h1>
          <p className="mb-2 text-sm font-[400] text-gray-400">
            Sign in to continue
          </p>
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
            <div className="flex items-center md:border-b-[0.5px] border-[1px] pl-2  border-gray-200 py-2 md:py-4  w-full">
              <TbPassword className="mr-2" />
              <input
                className="bg-transparent w-full h-[48px] border-none outline-none "
                type="password"
                name="password"
                placeholder="Password"
                onChange={changeHandler}
              />
            </div>
            <div className=" w-full px-4">
              <button
                onClick={saveData}
                className=" bg-black cursor-pointer hover:opacity-80 text-white font-[500] h-[57px] py-2 my-2 w-full "
              >
                {loading ? (
                  <i className="fa text-white text-lg fa-spinner fa-spin"></i>
                ) : (
                  "LOG IN"
                )}
              </button>
            </div>
          </form>

          {/* <div className="flex items-center w-full md:w-[80%] gap-2 my-6">
            <div className="h-[0.5px] bg-black flex-1"></div>
            Or
            <div className="h-[0.5px] bg-black flex-1"></div>
          </div> */}

          {/* Google Icon */}
          {/* <Link className="md:w-[80%]  w-full my-1">
            <button class="inline-flex h-[57px] outline-none w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                class="h-[18px] w-[18px] "
              />
              Continue with Google
            </button>
          </Link> */}

          <div className="flex items-center md:flex-col mt-4 flex-col-reverse justify-between w-full md:w-[80%]">
            <Link to={"/signup"} className="text-sm">
              Create an new account?{" "}
              <span className=" text-color_dark_pink font-bold">sign up</span>
            </Link>
            <Link
              to={"/forgotpassword"}
              className="text-sm text-color_dark_pink font-bold my-1 "
            >
              Forgot Password?
            </Link>
            <Link className="md:hidden" to={"/"}>Go to Home</Link>
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

export default Login;
