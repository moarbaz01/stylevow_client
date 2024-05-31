import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { TiTick } from "react-icons/ti";

function OrderDetails() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const order = user?.order.find((order) => order._id === id);

  if (!order) return null;

  const statusSteps = ["pending", "shipped", "arriving", "delivered"];
  const currentStepIndex = statusSteps.indexOf(order.status);
  const renderStatusStep = (step, index) => {
    const stepClassName =
      currentStepIndex >= index ? "bg-color_dark_pink" : "bg-gray-200";
    return (
      <div
        className={`h-12 w-12 rounded-full flex items-center justify-center ${stepClassName} text-white`}
        key={index}
      >
        <TiTick />
      </div>
    );
  };

  return (
    <div>
      <div className="md:block hidden">
        <Announcement />
      </div>
      <div className="md:block hidden">
        <Navbar />
      </div>

      {/* Heading */}
      <div className="h-20 md:hidden bg-white border-b-[1px] md:border-none w-full md:w-1/3 md:mx-auto flex items-center justify-between px-4 md:shadow-none shadow-sm">
        <Link to="/order">
          <h1 className="text-xl font-[600]">&lt; Order Details</h1>
        </Link>
      </div>

      {order.status !== "cancelled" && (
        <div className="flex mt-4 md:w-1/3 md:mx-auto md:border-[1px] md:mb-12 md:border-gray-300 md:rounded-md md:px-4 md:py-6 flex-col">
          {/* Tracking */}
          <div className="mt-4 mx-4 flex justify-between items-center">
            {statusSteps.map((step, index) => (
              <div className="flex items-center flex-col gap-2" key={index}>
                {renderStatusStep(step, index)}
                <div className="text-xs">
                  {step.replace(step[0], step[0].toUpperCase())}
                </div>
              </div>
            ))}
          </div>

          {/* Products */}
          <div className="mt-4 mx-4">
            <h1 className="font-[600]">Product</h1>
          </div>
          <div className="justify-center w-full px-2 flex-col flex">
            {order.products.map((e, index) => (
              <div
                className="flex items-start h-auto justify-between rounded-md w-full p-2 py-4 my-2 border-[1px] border-gray-200 shadow-pink-200 shadow-sm"
                key={index}
              >
                <div className="h-20 flex-[1] w-20 mx-1">
                  <img
                    className="w-16 object-cover h-20"
                    src={e.product.images[0]}
                    alt={e.product.title}
                  />
                </div>
                <div className="flex flex-[3] flex-col">
                  <div className="flex items-start w-full justify-between">
                    <span className="text-md flex-[5] font-[600]">
                      {e.product.title}
                    </span>
                  </div>
                  <div className="my-1">
                    <div className="flex items-center gap-4">
                      <span className="font-[500]">Color :</span>
                      <div
                        style={{ backgroundColor: e.color }}
                        className="h-4 w-4 rounded-full"
                      ></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-[500]">Size :</span>
                      <div className="h-6 w-6 flex items-center justify-center">
                        {e.size}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-[500]">
                        Quantity : {e.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl text-color_dark_pink font-[500]">
                      ₹{e.product.price * e.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Details */}
          <div className="mt-8 mx-4">
            <h1 className="font-[600]">Order Details</h1>
          </div>
          <div className="border-[1px] shadow-md shadow-color_pink p-4 m-2 border-gray-200">
            <div className="mt-4">
              <div className="flex items-center my-2 justify-between">
                <span className="opacity-60">Date Shipping</span>
                <span>
                  {order.shippingDate &&
                    new Date(order.shippingDate).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                </span>
              </div>
              <div className="flex items-center my-2 justify-between">
                <span className="opacity-60">Payment</span>
                <span>COD</span>
              </div>
              <div className="flex items-center my-2 justify-between">
                <span className="opacity-60">Order Id</span>
                <span>{order._id.slice(0, 12)}</span>
              </div>
              <div className="flex items-start my-2 justify-between">
                <span className="opacity-60">Address</span>
                <span className="text-sm max-w-[200px] text-end">
                  {order.shippingAddress.streetAddress}{" "}
                  {order.shippingAddress.streetAddress2},{" "}
                  {order.shippingAddress.city}, {order.shippingAddress.state},{" "}
                  {order.shippingAddress.zip}
                </span>
              </div>
              <div className="flex items-start my-2 justify-between">
                <span className="opacity-60">Status</span>
                <span
                  className={`font-bold ${
                    {
                      pending: "text-color_dark_pink",
                      "in-transit": "text-color_dark_pink",
                      delivered: "text-green-500",
                      cancelled: "text-red-500",
                      "out-of-stock": "text-red-500",
                      shipped: "text-color_dark_pink",
                    }[order.status]
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="mt-8 mx-4">
            <h1 className="font-[600]">Payment Details</h1>
          </div>
          <div className="border-[1px] shadow-md shadow-color_pink p-4 m-2 border-gray-200">
            <div className="mt-4">
              <div className="flex items-center my-2 justify-between">
                <span className="opacity-60">
                  Items ({order.products.length})
                </span>
                <span>₹{order.totalAmount}</span>
              </div>
              <div className="flex items-center my-2 justify-between">
                <span className="opacity-60">Shipping</span>
                <span>₹0</span>
              </div>
              <div className="flex items-center my-2 justify-between">
                <span className="opacity-60">Coupon</span>
                <span>No</span>
              </div>
              <div className="flex items-center my-2 justify-between">
                <span className="opacity-60">Discount</span>
                <span>₹0</span>
              </div>
              <div className="flex items-center mt-4 mx-4 justify-between">
                <span className="font-bold text-xl">Total Price</span>
                <span className="text-color_dark_pink font-bold text-xl">
                  ₹{order.totalAmount}
                </span>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="mx-4 mt-12 mb-24">
            <button className="bg-color_dark_pink text-white rounded-sm text-xl font-bold h-16 shadow-lg shadow-color_pink w-full">
              Notify Me
            </button>
          </div>
        </div>
      )}

      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
}

export default OrderDetails;
