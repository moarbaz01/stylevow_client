import { useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchUser } from "../redux/slicers/auth";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import { apiRequest } from "../services/ApiService";

function Address() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [loading, setLoading] = useState(false);
  const notify = (m) => toast.success(m);
  const notifyError = (m) => toast.success(m);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    fname: "",
    lname: "",
    streetAddress: "",
    streetAddress2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const loadingToastRef = useRef(null);

  const handleChange = (e) => {
    e.preventDefault();
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    apiRequest
      .post("/profile/address/get", { id })
      .then((res) => {
        const {
          fname,
          lname,
          streetAddress,
          streetAddress2,
          city,
          state,
          zip,
          phone,
        } = res.data.address;

        setData({
          fname,
          lname,
          streetAddress,
          streetAddress2,
          city,
          state,
          zip,
          phone,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    loadingToastRef.current = toast.loading("Proccessing");
    apiRequest({
      method: id !== null ? "PUT" : "POST",
      url: "/profile/address",
      data: id !== null ? { ...data, id } : data,
    })
      .then((res) => {
        dispatch(fetchUser());
        navigate(-1);
      })
      .catch((err) => notifyError(err.response.data.message))
      .finally(() => {
        setLoading(false);
        toast.dismiss(loadingToastRef.current);
      });
  };
  return (
    <div>
      <div className=" md:block hidden">
        <Announcement />
      </div>
      <div className=" md:block hidden">
        <Navbar />
      </div>
      <div className=" h-20 md:hidden bg-white border-b-[1px] cursor-pointer md:border-none w-full md:w-1/3 md:mx-auto flex items-center justify-start  px-4 md:shadow-none shadow-sm">
        <h1 onClick={() => navigate(-1)} className=" text-xl font-[600] ">
          &lt; Add Address
        </h1>
      </div>

      <form className=" flex mt-4 md:mt-4  md:w-1/3 md:mx-auto md:border-[1px] md:mb-12 md:border-gray-300 md:rounded-md md:px-4 md:py-6 flex-col">
        <div className="mt-4 mx-4">
          <h1 className=" font-[600]">First Name</h1>
        </div>
        <div className="h-16 w-[90%] mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
          <input
            name="fname"
            type="text"
            className="h-12 flex-[3] outline-none"
            onChange={handleChange}
            value={data.fname}
          />
        </div>
        <div className="mt-4 mx-4">
          <h1 className=" font-[600]">Last Name</h1>
        </div>
        <div className="h-16 w-[90%] mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
          <input
            name="lname"
            type="text"
            className="h-12 flex-[3] outline-none"
            onChange={handleChange}
            value={data.lname}
          />
        </div>
        <div className="mt-4 mx-4">
          <h1 className=" font-[600]">Street Address</h1>
        </div>
        <div className="h-16 w-[90%] mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
          <input
            name="streetAddress"
            type="text"
            className="h-12 flex-[3] outline-none"
            onChange={handleChange}
            value={data.streetAddress}
          />
        </div>
        <div className="mt-4 mx-4">
          <h1 className=" font-[600]">Street Address 2 (Optional)</h1>
        </div>
        <div className="h-16 w-[90%] mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
          <input
            name="streetAddress2"
            type="text"
            className="h-12 flex-[3] outline-none"
            onChange={handleChange}
            value={data.streetAddress2}
          />
        </div>
        <div className="mt-4 mx-4">
          <h1 className=" font-[600]">City</h1>
        </div>
        <div className="h-16 w-[90%] mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
          <input
            onChange={handleChange}
            value={data.city}
            name="city"
            type="text"
            className="h-12 flex-[3] outline-none"
          />
        </div>
        <div className="mt-4 mx-4">
          <h1 className=" font-[600]">State</h1>
        </div>
        <div className="h-16 w-[90%] mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
          <input
            name="state"
            type="text"
            onChange={handleChange}
            className="h-12 flex-[3] outline-none"
            value={data.state}
          />
        </div>
        <div className="mt-4 mx-4">
          <h1 className=" font-[600]">Zip Code</h1>
        </div>
        <div className="h-16 w-[90%] mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
          <input
            onChange={handleChange}
            value={data.zip}
            name="zip"
            type="text"
            className="h-12 flex-[3] outline-none"
          />
        </div>
        <div className="mt-4 mx-4">
          <h1 className=" font-[600]">Phone Number</h1>
        </div>
        <div className="h-16 w-[90%] mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
          <input
            name="phone"
            type="text"
            className="h-12 flex-[3] outline-none"
            onChange={handleChange}
            value={data.phone}
          />
        </div>

        <div className="px-4 md:mt-12 mt-12 mb-6 w-full">
          <button
            onClick={handleSubmit}
            className=" bg-color_dark_pink text-white rounded-sm text-xl font-bold h-16 shadow-sm shadow-color_dark_pink w-full"
          >
            {loading ? (
              <i className="fa text-white text-lg fa-spinner fa-spin"></i>
            ) : id ? (
              "Save"
            ) : (
              "Add"
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

export default Address;
