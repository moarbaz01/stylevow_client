import React, { useState } from "react";
import { CiCreditCard2, CiEdit, CiTrash } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchUser } from "../redux/slicers/auth";
import Product404 from "../components/Product404";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiRequest } from "../services/ApiService";
import MyToaster from "../components/MyToaster";

function Cards() {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const notify = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setLoading(true);
    apiRequest
      .delete("/profile/card", {
        data: { cardId: id },
      })
      .then((_) => {
        dispatch(fetchUser());
        notify("Card Deleted Successfully");
      })
      .catch((err) => {
        notifyError(err.response.data.message);
      })
      .finally(() => setLoading(false));
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
      <div className=" h-20 bg-white border-b-[1px] md:border-none w-full md:w-1/3 md:mx-auto flex items-center justify-between  px-4 md:shadow-none shadow-sm">
        <Link to="/payment">
          <h1 className=" text-xl font-[600] ">&lt; Cards</h1>
        </Link>
      </div>


      <div className="flex mt-4 md:mt-4  md:w-1/3 md:mx-auto md:border-[1px] md:mb-12 md:border-gray-300 md:rounded-md px-4 md:py-6 flex-col">
        {user && user.cards && user.cards.length > 0 ? (
          user.cards.map((c, index) => {
            return (
              <div
                key={index}
                className=" bg-blue-400 p-2 py-4 my-2 relative rounded-sm"
              >
                <div className=" bg-red-500 text-white w-6 text-xl flex items-center justify-center rounded-full absolute right-4 h-6">
                  {loading ? (
                    <i className="fa text-white text-lg fa-spinner fa-spin"></i>
                  ) : (
                    <CiTrash
                      className=" cursor-pointer"
                      onClick={() => handleDelete(c._id)}
                    />
                  )}
                </div>
                <div className=" bg-red-500 text-white w-6 text-xl flex items-center justify-center rounded-full absolute right-12 h-6">
                  {loading ? (
                    <i className="fa text-white text-lg fa-spinner fa-spin"></i>
                  ) : (
                    <CiEdit
                      className=" cursor-pointer"
                      onClick={() => navigate(`/addCard?id=${c._id}`)}
                    />
                  )}
                </div>
                <CiCreditCard2 className=" text-5xl text-white m-4" />
                <h1 className=" text-3xl text-center mt-4 font-bold text-white">
                  {c.cardNumber &&
                    c.cardNumber.substring(0, 4) +
                      " " +
                      c.cardNumber.substring(4, 8) +
                      " " +
                      c.cardNumber.substring(8, 12) +
                      " " +
                      c.cardNumber.substring(12, 16)}
                </h1>
                <div className="flex items-center">
                  <div className=" flex items-center m-4 justify-center flex-col">
                    <span className=" text-gray-200 ">Card Holder</span>
                    <span className=" text-sm font-bold text-white">
                      {c.cardHolderName}
                    </span>
                  </div>
                  <div className=" flex items-center justify-center m-4 flex-col">
                    <span className=" text-gray-200">Expiration</span>
                    <span className=" text-white text-sm font-bold">
                      {c.expiryDate.substring(0, 2) +
                        "/" +
                        c.expiryDate.substring(2, 4)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Product404
            props={{
              symbol: "!",
              title: "No Cards",
              para: "Add your card by click on below button",
              navigate: "Add Card",
              redirect: "/addCard",
            }}
          />
        )}

        {user && user.cards && user.cards.length > 0 && (
          <div className="px-4 md:mt-12 mt-64 w-full">
            <Link to="/addCard">
              <button className=" bg-color_dark_pink text-white rounded-sm text-xl font-bold h-16 shadow-lg shadow-color_pink w-full">
                Add More
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
}

export default Cards;
