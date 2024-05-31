import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { CiTrash } from "react-icons/ci";
import { useSelector } from "react-redux";
import { removeFromCart, updateCart } from "../redux/slicers/cart";
import Product404 from "../components/Product404";
import { fetchUser } from "../redux/slicers/auth";
import toast from "react-hot-toast";
import { apiRequest } from "../services/ApiService";
import MyToaster from "../components/MyToaster";

function Cart() {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const { isUser} = useSelector((state) => state.auth);
  const notify = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const dispatch = useDispatch();
  const [isPromocode, setIsPromocode] = useState(false);
  const [promocode, setPromocode] = useState("");
  const [promocodeError, setPromocodeError] = useState("");
  const [loading, setLoading] = useState(false);
  const [setPromocodeSuccesss] = useState("");
  const navigate = useNavigate();
  const topRef = React.useRef();

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  function handleCheckout() {
    if (isUser && items?.length > 0) {
      navigate("/address", {
        state: {
          totalPrice,
          items,
          isPromocode,
        },
      });
    } else {
      notifyError("Please login to checkout");
    }
  }

  function handlePromocode() {
    setLoading(true);
    apiRequest
      .post("/promocode/get", { promocode })
      .then((res) => {
        setLoading(false);
        setIsPromocode(true);
        setPromocodeSuccesss(res.data.message);
      })
      .catch((err) => {
        setLoading(false);
        setIsPromocode(false);
        setPromocodeError(err.response.data.message);
      });
  }

  function handleUpdate(_id, q, size, price, color, value) {
    if (isUser) {
      const data = {
        _id,
        quantity: q + value,
        size,
        color,
      };
      dispatch(updateCart(data));
      apiRequest
        .put("/cart/update", {
          cartId: _id,
          quantity: q + value,
          totalAmount: (q + value) * price,
        })
        .then(() => dispatch(fetchUser()))
        .catch((err) => notifyError(err.response.data.message));
    }
  }

  function handleRemove(cartId) {
    if (isUser) {
      dispatch(removeFromCart(cartId));
      apiRequest
        .delete(`/cart/delete`, {
          data: { cartId },
        })
        .then((res) => {
          if (res.data.user && res.data) {
            notify(res.data.message);
            dispatch(fetchUser());
          }
        })
        .catch((err) => {
          notifyError(err.response.data.message);
        });
    }
  }

  return (
    <div>
      <div ref={topRef}></div>
      <MyToaster />
      <div className=" hidden md:block">
        <Announcement />
      </div>
      <div className=" hidden md:block">
        <Navbar />
      </div>

      <div className=" h-20 bg-white border-b-[1px] md:hidden w-full flex items-center justify-start px-4 shadow-sm">
        <h1 className="text-xl font-[600] ">Your Cart</h1>
      </div>

      {/* Cart */}
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col w-full items-center my-8 ">
          {/* Cart Table */}
          <div className="w-full hidden md:block">
            {items.length > 0 ? (
              <table cellPadding={"2px"} className="table-auto  min-w-full">
                <thead>
                  <tr className=" bg-gray-200 px-4 border-b-[1px] h-12">
                    <th className="text-start pl-12">PRODUCT</th>
                    <th>PRICE</th>
                    <th>QTY</th>
                    <th>UNIT PRICE</th>
                  </tr>
                </thead>
                <tbody>
                  {items?.map((e, index) => {
                    return (
                      <tr className=" border-[1px]" key={index}>
                        <td className=" pl-12">
                          <div className="flex items-center py-4 gap-6">
                            <img
                              className="h-24"
                              src={e.product.images[0]}
                              alt={`Product: ${e.product.title}`}
                            />
                            <div className="flex flex-col gap-2">
                              <div className="flex items-start gap-2">
                                <span>Title: </span>
                                <span className="font-semibold">
                                  {e.product.title}
                                </span>
                                <div
                                  onClick={() => handleRemove(e._id)}
                                  className="h-10 cursor-pointer flex-[1] w-10"
                                >
                                  <CiTrash className=" hover:text-red-500 transition text-3xl" />
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span>Color: </span>
                                <div
                                  style={{ backgroundColor: e.color }}
                                  className="h-6 w-6 p-2 rounded-full"
                                ></div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span>Size: </span>
                                <div className="h-8 w-8 p-2 text-sm flex items-center justify-center bg-gray-100 rounded-full">
                                  {e.size}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="font-semibold text-center">
                          <span>₹{e.product.price}</span>
                        </td>

                        <td>
                          <div className="flex flex-row items-center justify-center">
                            <button
                              className="bg-gray-200 py-2 px-4 rounded-l-lg text-xl"
                              onClick={() =>
                                e.quantity > 1 &&
                                handleUpdate(
                                  e._id,
                                  e.quantity,
                                  e.size,
                                  e.product.price,
                                  e.color,
                                  -1
                                )
                              }
                            >
                              -
                            </button>
                            <span className="py-2 px-4 w-12 text-center">
                              {e.quantity}
                            </span>
                            <button
                              className="bg-gray-200 py-2 px-4 rounded-r-lg text-xl"
                              onClick={() =>
                                e.quantity < 5 &&
                                handleUpdate(
                                  e._id,
                                  e.quantity,
                                  e.size,
                                  e.product.price,
                                  e.color,
                                  1
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>

                        <td className="font-semibold text-center">
                          <span>₹{e.product.price * e.quantity}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <Product404
                props={{
                  symbol: "!",
                  title: "Your Cart is Empty",
                  para: "Add products in your cart",
                  navigate: "GO TO HOME",
                  redirect: "/",
                }}
              />
            )}
          </div>

          {/* Phone Cart */}
          <div className="md:hidden  justify-center w-full px-2 flex-col flex">
            {items.length > 0 ? (
              items.map((e, index) => {
                return (
                  <div
                    className=" flex items-center h-auto justify-between rounded-md w-full p-2 py-4 my-2 border-[1px] border-gray-200 shadow-pink-200 shadow-sm "
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
                        <span className=" text-xl flex-[5] font-[500]">
                          {e.product.title}
                        </span>
                        <div
                          onClick={() => handleRemove(e._id)}
                          className="h-10 cursor-pointer flex-[1] w-10"
                        >
                          <CiTrash className=" text-3xl" />
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
                      </div>

                      <div className=" flex items-center justify-between">
                        <span className=" text-2xl text-color_dark_pink font-[500]">
                          ${e.product.price * e.quantity}
                        </span>
                        <div className="md:flex flex-col  items-start gap-2">
                          <div className="flex flex-row items-center">
                            <button
                              className="bg-gray-200 py-2 px-5 rounded-lg text-3xl"
                              onClick={() =>
                                e.quantity > 1 &&
                                handleUpdate(
                                  e._id,
                                  e.quantity,
                                  e.size,
                                  e.product.price,
                                  e.color,
                                  -1
                                )
                              }
                            >
                              -
                            </button>
                            <span className="py-4 px-6 w-16 rounded-lg">
                              {e.quantity}
                            </span>
                            <button
                              className="bg-gray-200 py-2 px-4 rounded-lg  text-3xl"
                              onClick={() =>
                                e.quantity < 5 &&
                                handleUpdate(
                                  e._id,
                                  e.quantity,
                                  e.size,
                                  e.product.price,
                                  e.color,
                                  1
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <Product404
                props={{
                  symbol: "!",
                  title: "Your Cart is Empty",
                  para: "Add products in your cart",
                  navigate: "GO TO HOME",
                  redirect: "/",
                }}
              />
            )}
          </div>

          {/* CheckOut Summary */}
          {items.length > 0 && (
            <div className="flex md:items-start w-full md:flex-row p-2 py-4 md:py-0 flex-col md:justify-between my-6">
              <div className="">
                <div className="mx-2 inline-flex items-center justify-between border-[1px] border-gray-300">
                  <input
                    type="text"
                    className=" w-[260px] outline-none pl-4"
                    name="promocode"
                    onChange={(e) => setPromocode(e.target.value)}
                    value={promocode}
                    placeholder="Promocode"
                  />
                  <button
                    onClick={handlePromocode}
                    className=" flex-[1] h-14 bg-color_dark_pink px-2 text-white"
                  >
                      Radeem
                  </button>
                </div>
                {promocodeError && (
                  <div className=" text-red-500 mt-1 block font-bold mx-2">
                    {promocodeError}
                  </div>
                )}
              </div>

              <div className="flex items-center mx-2 mt-8 p-2 shadow-sm justify-center flex-col md:p-4 md:w-[40%] md:bg-gray-100">
                <div className="flex my-2 w-full items-center justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex my-2 w-full items-center justify-between">
                  <span>Shipping Fee</span>
                  <span>₹0</span>
                </div>
                <div className="flex my-2 w-full items-center justify-between">
                  <span>Promocode</span>
                  <span>No</span>
                </div>

                <div className="flex p-4 my-1 w-full items-center justify-between font-bold text-2xl border-t-[4px] border-gray-100">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>

                <div className="w-full text-center mb-4">
                  <button
                    onClick={handleCheckout}
                    className=" text-center py-2 h-16 px-4 w-full font-bold text-xl shadow-sm shadow-color_dark_pink hover:bg-color_pink transition rounded-lg  bg-color_dark_pink text-white"
                  >
                    Check Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className=" hidden md:block">
        <Footer />
      </div>
    </div>
  );
}

export default Cart;
