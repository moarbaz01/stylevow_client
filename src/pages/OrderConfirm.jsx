import React, { useRef, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../redux/slicers/auth";
import { getUserCart } from "../redux/slicers/cart";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import { month } from "../data";
import { apiRequest } from "../services/ApiService";
import toast from "react-hot-toast";

function OrderConfirm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [orderState] = useState(location?.state);
  const dispatch = useDispatch();
  const date = new Date();
  const loadingToastRef = useRef(null);

  function getShippingDate() {
    const shippingDate = new Date(date.getTime() + 3 * 24 * 60 * 60 * 1000);
    return shippingDate;
  }

  function handleOrder() {
    setLoading(true);
    loadingToastRef.current = toast.loading("Loading...");
    const shippingDate = getShippingDate();
    const order = {
      products: orderState.items,
      totalAmount: orderState.totalPrice,
      shippingDate: shippingDate,
      shippingAddress: orderState.address,
      paymentMethod: orderState.paymentMethod,
    };
    apiRequest
      .post("/order/create", order)
      .then(() => {
        setLoading(false);
        navigate("/success");
        dispatch(fetchUser());
        dispatch(getUserCart());
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      })
      .finally(() => {
        toast.dismiss(loadingToastRef.current);
      });
  }

  return (
    orderState?.items?.length > 0 && (
      <div>
        <div className=" hidden md:block">
          <Announcement />
        </div>
        <div className=" hidden md:block">
          <Navbar />
        </div>
        {/* Heading */}
        <div className=" h-20 bg-white border-b-[1px] md:border-none cursor-pointer  w-full md:w-1/3 md:mx-auto flex items-center justify-between  px-4 md:shadow-none shadow-sm">
          <h1 onClick={() => navigate(-1)} className=" text-xl font-[600] ">
            &lt; Your Order
          </h1>
        </div>

        {/* Products */}
        <div className="flex mt-4 md:mt-4  md:w-1/3 md:mx-auto md:border-[1px] md:mb-12 md:border-gray-300 md:rounded-md md:px-4 md:py-6 flex-col">
          {/* Product */}
          <div className="mt-8 mx-4">
            <h1 className=" font-[600]">Product</h1>
          </div>
          <div className=" justify-center w-full px-2 flex-col flex">
            {orderState?.items?.map((e, index) => {
              return (
                <div
                  className=" flex items-start h-auto justify-between rounded-md w-full p-2 py-4 my-2 border-[1px] border-gray-200 shadow-pink-200 shadow-sm "
                  key={index}
                >
                  <div className="h-20 flex-[1] w-20 mx-1">
                    <img
                      className=" w-16 object-cover h-20"
                      src={e.product.images[0]}
                      alt=""
                    />
                  </div>
                  <div className=" flex flex-[3] flex-col">
                    <div className=" flex items-start w-full justify-between">
                      <span className=" text-md flex-[5] font-[600]">
                        {e.product.title}
                      </span>
                      <div className="h-10 flex-[1] w-10">
                        <CiHeart className=" text-3xl" />
                      </div>
                    </div>
                    <div className=" my-1">
                      <div className=" flex items-center gap-4">
                        <span className=" font-[500]">Color :</span>{" "}
                        <div
                          style={{ backgroundColor: e.color }}
                          className=" h-4 w-4 rounded-full"
                        ></div>
                      </div>
                      <div className=" flex items-center gap-4">
                        <span className=" font-[500]">Size :</span>{" "}
                        <div className=" h-6 w-6 flex items-center justify-center  ">
                          {e.size}
                        </div>
                      </div>
                      <div className="">
                        <span className=" font-[500]">
                          Quanity : {e.quantity}
                        </span>
                      </div>
                    </div>

                    <div className=" flex items-center justify-between">
                      <span className=" text-2xl text-color_dark_pink font-[500]">
                        ₹{e.product.price * e.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Shipping Details */}
          <div className="mt-8 mx-4">
            <h1 className=" font-[600]">Order Details</h1>
          </div>

          <div className=" border-[1px] shadow-md shadow-color_pink p-4 m-2 border-gray-200">
            <div className=" mt-4">
              <div className=" flex items-center my-2 justify-between">
                <span className=" opacity-60">Estimated Delivery</span>
                <span>
                  {getShippingDate().getDate()}{" "}
                  {month[getShippingDate().getMonth()]}{" "}
                  {getShippingDate().getFullYear()}
                </span>
              </div>
              <div className=" flex items-center my-2 justify-between">
                <span className=" opacity-60">Payment</span>
                <span>{orderState.paymentMethod}</span>
              </div>

              <div className=" flex items-start my-2 justify-between">
                <span className=" opacity-60">Address</span>
                <span className=" text-sm max-w-[200px] text-end">
                  {orderState.address.streetAddress}{" "}
                  {orderState.address.streetAddress2} ,{" "}
                  {orderState.address.city} , {orderState.address.state},{" "}
                  {orderState.address.zip}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="mt-8 mx-4">
            <h1 className=" font-[600]">Payment Details</h1>
          </div>

          <div className=" border-[1px] shadow-md shadow-color_pink p-4 m-2 border-gray-200">
            <div className=" mt-4">
              <div className=" flex items-center my-2 justify-between">
                <span className=" opacity-60">
                  Items ({orderState.items.length})
                </span>
                <span>₹{orderState.totalPrice}</span>
              </div>
              <div className=" flex items-center my-2 justify-between">
                <span className=" opacity-60">Shipping</span>
                <span>₹0</span>
              </div>
              <div className=" flex items-center my-2 justify-between">
                <span className=" opacity-60">Coupon</span>
                <span className="">No</span>
              </div>
              <div className=" flex items-center my-2 justify-between">
                <span className=" opacity-60">Discount</span>
                <span className="">₹0</span>
              </div>
              <div className=" flex items-center mt-4 mx-4 justify-between">
                <span className=" font-bold text-xl">Total Price</span>
                <span className=" text-color_dark_pink font-bold text-xl">
                  ₹{orderState.totalPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="mx-4 mt-12">
            <button
              onClick={handleOrder}
              className=" bg-color_dark_pink text-white rounded-sm text-xl font-bold h-16 shadow-lg shadow-color_pink w-full"
            >
              {loading ? (
                <i className="fa text-white text-lg fa-spinner fa-spin"></i>
              ) : (
                "Confirm Order"
              )}
            </button>
          </div>
          <div className="mx-4 mt-4 mb-4">
            <button
              onClick={() => navigate("/cart")}
              className=" bg-black text-white rounded-sm text-xl font-bold h-16  w-full"
            >
              Cancel Order
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <Footer />
        </div>
      </div>
    )
  );
}

export default OrderConfirm;
