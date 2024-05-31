import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchUser } from "../redux/slicers/auth";
import { useDispatch } from "react-redux";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import { apiRequest } from "../services/ApiService";
import MyToaster from "../components/MyToaster";

function AddCard() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });

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
      .post("/profile/card/get", { cardId: id })
      .then((res) => {
        setData(res.data.card);
      })
      .catch((err) => console.log(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    apiRequest({
      method: id !== null ? "PUT" : "POST",
      url: "/profile/card",
      data: id !== null ? { ...data, cardId: id } : data,
    })
      .then(() => {
        dispatch(fetchUser());
        navigate("/cards");
      })
      .catch((err) => setError(err.response.data.message))
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

      <div className=" h-20 bg-white border-b-[1px] md:border-none w-full md:w-1/3 md:mx-auto flex items-center justify-between  px-4 md:shadow-none shadow-sm">
        <Link to="/cards">
          <h1 className=" text-xl font-[600] ">&lt; Add Card</h1>
        </Link>
      </div>

      <MyToaster />

      <form
        className="flex mt-4 md:mt-4  md:w-1/3 md:mx-auto md:border-[1px] md:mb-12 md:border-gray-300 md:rounded-md md:px-4 md:py-6 flex-col"
        onSubmit={handleSubmit}
      >
        <div className="mt-4 mx-4">
          <h1 className=" font-[600]">Card Number</h1>
        </div>

        <div className="h-16 w-[90%] mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
          <input
            type="number"
            className="h-12 flex-[3] outline-none"
            placeholder="Enter Card Number"
            name="cardNumber"
            onChange={handleChange}
            value={data.cardNumber}
          />
        </div>
        {/* <span className="mx-4 text-xs text-red-500">
        OOPS! your password is not correct
      </span> */}

        <div className="mt-4 mx-4 flex items-center justify-between">
          <h1 className=" font-[600]">Expiration Date</h1>
          <h1 className=" font-[600] mr-4">CVV</h1>
        </div>

        <div className=" flex items-center  mt-4 justify-between w-full px-4 ">
          <input
            type="number"
            className=" border-2 border-gray-200 py-4 px-1 outline-none w-40"
            placeholder="Expiration Date"
            name="expiryDate"
            onChange={handleChange}
            value={data.expiryDate}
          />
          <input
            type="number"
            className=" border-2 border-gray-200 py-4 w-36 px-1 outline-none "
            placeholder="CVV"
            name="cvv"
            onChange={handleChange}
            value={data.cvv}
          />
        </div>

        {/* <span className="mx-4 text-xs text-color_dark_pink">
        We Will Send Verification to your new email
    </span> */}
        <div className="mt-4 mx-4">
          <h1 className=" font-[600]">Card Holder</h1>
        </div>

        <div className="h-16 w-[90%] mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
          <input
            type="text"
            className="h-12 flex-[3] outline-none"
            placeholder="Enter Card Name"
            name="cardHolderName"
            onChange={handleChange}
            value={data.cardHolderName}
          />
        </div>
        {error && (
          <span className="mx-4 text-xs text-color_dark_pink">{error}</span>
        )}

        <div className="px-4 mt-12 w-full">
          <button
            type="submit"
            className=" bg-color_dark_pink text-white rounded-sm text-xl font-bold h-16 shadow-lg shadow-color_pink w-full"
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

      <div className=" hidden md:block">
        <Footer />
      </div>
    </div>
  );
}

export default AddCard;
