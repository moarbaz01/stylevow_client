import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import React from "react";
import { CiTrash } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchUser } from "../redux/slicers/auth";
import Product404 from "../components/Product404";
import { FaPlus } from "react-icons/fa6";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import { apiRequest } from "../services/ApiService";
import MyToaster from "../components/MyToaster";

function AddressAdd() {
  const { isUser, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const notify = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const navigate = useNavigate();
  const location = useLocation();
  const [orderState] = useState(location?.state);
  const [address, selectAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = (id) => {
    apiRequest
      .delete("/profile/address", { data: { id } })
      .then((_) => {
        notify("Address Deleted Successfully");
        dispatch(fetchUser());
        navigate("/address");
      })
      .catch((err) => {
        notifyError(err.response.data.message);
      });
  };

  return (
    <div>
      <MyToaster />
      <div className="md:block hidden">
      <Announcement />
      </div>
      <div className="md:block hidden">
      <Navbar />
      </div>
      <div className="h-20 bg-white border-b-[1px] md:border-none w-full md:mx-auto flex items-center justify-between px-4 md:shadow-none shadow-sm">
        <Link
          className="md:hidden block"
          to={orderState?.items?.length > 0 ? "/cart" : "/account"}
        >
          <h1 className="text-xl font-[600]">
            &lt; {orderState?.items?.length > 0 ? "Ship To" : "Address"}
          </h1>
        </Link>
        <Link
          className="hidden md:block"
          to={orderState?.items?.length > 0 ? "/cart" : "/"}
        >
          <h1 className="text-xl font-[600]">
            &lt; {orderState?.items?.length > 0 ? "Ship To" : "Address"}
          </h1>
        </Link>
        {orderState?.items?.length > 0 && (
          <Link className="md:hidden" to={"/address/add"}>
            <FaPlus />
          </Link>
        )}
        <button
          onClick={() =>
            navigate(
              orderState?.items?.length > 0
                ? address !== ""
                  ? "/payment"
                  : ""
                : "/address/add",
              { state: address !== "" ? { ...orderState, address } : "" }
            )
          }
          disabled={orderState?.items?.length > 0 && address === ""}
          className="bg-color_dark_pink text-white hidden md:block rounded-sm text-lg font-bold px-4 py-2 shadow-lg shadow-color_pink"
        >
          {orderState?.items?.length > 0
            ? address !== ""
              ? "Next"
              : "Select Address"
            : "New"}
        </button>
      </div>
      
      <div className="md:flex w-full md:mb-12 md:items-center md:flex-wrap">
        {user.address?.length > 0 ? (
          user.address?.map((a, index) => (
            <div
              onClick={() => orderState?.items.length > 0 && selectAddress(a)}
              key={index}
              className={`shadow-md flex md:h-[260px] md:w-[360px] flex-col shadow-color_pink p-4 m-2 md:m-4 ${
                address._id === a._id
                  ? "border-[2px] border-color_dark_pink"
                  : "border-[1px] border-gray-200"
              }`}
            >
              <h1 className="text-xl font-[600]">{`${a.fname}  ${a.lname}`}</h1>
              <span className="text-sm my-4 opacity-60">
                {a.streetAddress} {a.streetAddress2}, {a.city}, {a.state},{" "}
                {a.zip}
              </span>
              <span className="text-sm opacity-60">{a.phone}</span>
              <div className="flex items-center my-6 justify-between">
                <button
                  onClick={() => navigate(`/address/add?id=${a._id}`)}
                  className="bg-color_dark_pink text-white rounded-sm text-xl font-bold h-16 w-24 shadow-lg shadow-color_pink"
                >
                  Edit
                </button>
                <CiTrash
                  onClick={() => handleDelete(a._id)}
                  className="cursor-pointer text-4xl ml-6"
                />
              </div>
            </div>
          ))
        ) : (
          <Product404
            props={{
              symbol: "!",
              title: "No Address",
              para: "Add address by click on below button",
              navigate: "Add Address",
              redirect: "/address/add",
            }}
          />
        )}
      </div>
      {isUser && user.address?.length < 5 && user.address?.length > 0 && (
        <div className="px-4 mt-12 md:w-1/3 md:hidden md:mx-auto mb-6 w-full">
          <button
            onClick={() =>
              navigate(
                orderState?.items?.length > 0
                  ? address !== ""
                    ? "/payment"
                    : ""
                  : "/address/add",
                { state: address !== "" ? { ...orderState, address } : "" }
              )
            }
            disabled={orderState?.items?.length > 0 && address === ""}
            className="bg-color_dark_pink text-white rounded-sm text-xl font-bold h-16 shadow-lg shadow-color_pink w-full"
          >
            {orderState?.items?.length > 0
              ? address !== ""
                ? "Next"
                : "Select Address"
              : "Add Address"}
          </button>
        </div>
      )}
      <div className="hidden md:block">
      <Footer />
      </div>
    </div>
  );
}

export default AddressAdd;
