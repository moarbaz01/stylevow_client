import { useNavigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import Product404 from "../components/Product404";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Order() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <div>
      <div className=" md:block hidden">
        <Announcement />
      </div>
      <div className=" md:block hidden">
        <Navbar />
      </div>

      <div className=" h-20 bg-white border-b-[1px] md:border-none w-full md:w-1/3 flex items-center justify-start  px-4 md:shadow-none shadow-sm">
        <h1
          onClick={() => navigate("/account")}
          className=" text-xl md:hidden font-[600] cursor-pointer "
        >
          &lt; Order
        </h1>
        <h1
          onClick={() => navigate(-1)}
          className=" text-xl hidden md:block font-[600] cursor-pointer "
        >
          &lt; Order
        </h1>
      </div>

      <div className="md:flex w-full  md:items-center md:flex-wrap">
        {user.order?.length > 0 ? (
          [...user.order]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((order, index) => {
              return (
                <div
                  onClick={() => navigate(`/order/${order._id}`)}
                  key={index}
                  className=" border-[1px] md:w-[320px] cursor-pointer shadow-md shadow-color_pink p-4 m-4 border-gray-200"
                >
                  <h1 className=" text-lg font-[600]">{order._id}</h1>
                  <span className=" text-sm opacity-60">
                    {order.createdAt &&
                      new Date(order.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                  </span>
                  <div className="h-2  border-t-[3px] mt-4 border-dotted"></div>

                  <div className="mt-4 flex items-center gap-2">
                    {order.products.map((cart, i) => {
                      return (
                        i < 3 && (
                          <img
                            key={i}
                            className="size-12 border-2 border-color_dark_pink object-cover rounded-full "
                            src={cart.product.images[0]}
                            alt=""
                          />
                        )
                      );
                    })}
                  </div>

                  <div className=" mt-4">
                    <div className=" flex items-center my-2 justify-between">
                      <span className=" opacity-60">Order Status</span>
                      {(order.status === "pending" && (
                        <span className=" font-bold text-color_dark_pink">
                          Pending
                        </span>
                      )) ||
                        (order.status === "in-transit" && (
                          <span className=" font-bold text-color_dark_pink">
                            In-Transit
                          </span>
                        )) ||
                        (order.status === "delivered" && (
                          <span className=" font-bold text-green-500">
                            Delivered
                          </span>
                        )) ||
                        (order.status === "cancelled" && (
                          <span className=" font-bold text-red-500">
                            Cancelled
                          </span>
                        )) ||
                        (order.status === "out-of-stock" && (
                          <span className=" font-bold text-red-500">
                            Out Of Stock
                          </span>
                        )) ||
                        (order.status === "shipped" && (
                          <span className=" font-bold text-color_dark_pink">
                            Shipped
                          </span>
                        ))}
                    </div>
                    <div className=" flex items-center my-2 justify-between">
                      <span className=" opacity-60">Items</span>
                      <span>{order.totalItems} Items Purchased</span>
                    </div>
                    <div className=" flex items-center my-2 justify-between">
                      <span className=" opacity-60">Price</span>
                      <span className=" font-bold text-color_dark_pink">
                        ₹{order.totalAmount}
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
              title: "No Orders",
              para: "Explore products on stylevow",
              navigate: "Go To Home",
              redirect: "/",
            }}
          />
        )}
      </div>

      <div className=" md:block hidden">
        <Footer />
      </div>
    </div>
  );
}

export default Order;
