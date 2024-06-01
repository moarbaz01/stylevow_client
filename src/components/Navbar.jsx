import React, { useEffect, useState } from "react";
import {
  CiUser,
  CiSearch,
  CiHeart,
  CiShoppingCart,
  CiHome,
} from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/slicers/auth";
import { apiRequest } from "../services/ApiService";

function Navbar({ home }) {
  const [border, setBorder] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState([]);
  const { user, isUser } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const dispatch = useDispatch();
  // sticky nav
  const [stickyClass, setStickyClass] = useState("");

  const handleLogout = () => {
    dispatch(logoutSuccess());
  };

  function stickNavbar() {
    let windowHeight = window.scrollY;
    windowHeight > "50" ? setStickyClass("sticky-nav") : setStickyClass("");
    // 1
  }

  const fetchProducts = async () => {
    try {
      const res = await apiRequest.get(`/products/all`);
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    if (query === "") return setResults([]);

    const filteredProducts = products.filter((product) => {
      return product.title
        .replace("-", "")
        .toLowerCase()
        .includes(query.toLowerCase());
    });
    setResults(filteredProducts);
  };

  const handleNavigate = () => {
    if (query) {
      navigate(`/products/search/${query}`);
      setQuery("");
    }
  };

  useEffect(() => {
    console.log(user.wishlist);
  }, [user.wishlist]);
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [query]);

  return (
    <div
      className={`bg-white z-[9999] border-b-[1px] ${
        stickyClass ? "fixed shadow-sm top-0 left-0 w-full" : "static"
      } border-gray-200 mx-auto`}
    >
      <div className="px-4 max-w-[1200px] hidden  mx-auto py-4 md:flex items-center justify-center  md:justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-3xl cursor-pointer tracking-wide  my-2 md:my-0 font-bold"
        >
          StyleVow
        </div>

        {/* Search Bar */}
        <div className="md:flex hidden items-center relative h-[46px] w-[263px] md:w-[50%] my-2 md:my-0 bg-white hover:border-gray-200 hover:bg-white border-[1px]  md:py-1 py-2 rounded-md">
          <div
            className={`flex items-center w-full gap-4  ${
              border
                ? "border-color_dark_pink border-[2px]"
                : "border-gray-300 border-[1px]"
            } transition-colors rounded-sm p-2 justify-between`}
          >
            <input
              onFocus={() => setBorder(true)}
              onBlur={() => setBorder(false)}
              type="text"
              className={`w-[90%] outline-none`}
              placeHolder={!border && "Search product"}
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <div onClick={handleNavigate} className={`text-3xl cursor-pointer`}>
              <CiSearch
                className={`${
                  border ? "text-color_dark_pink" : "text-gray-500"
                }`}
              />
            </div>
          </div>

          {/* Product Results */}
          <ul className="mt-0 absolute bg-white top-14 flex-wrap flex left-0 z-[9999] w-full">
            {results &&
              results.map((e, index) => {
                return (
                  index < 6 && (
                    <Link
                      key={index}
                      className="w-full"
                      to={`/product/${e._id}`}
                    >
                      <li className="flex hover:bg-pink-50 transition items-start border-b-[1px] p-4">
                        <div className="">
                          <img
                            src={e.images[0]}
                            alt=""
                            className="w-[50px] h-[50px] object-cover rounded-sm"
                          />
                        </div>
                        <div className="flex flex-col items-start w-[80%] pl-4">
                          <h1 className="text-xs font-semibold text-gray-600">
                            {e.title}
                          </h1>
                          <h1 className="text-sm font-semibold text-color_dark_pink">
                            ₹{e.price}
                          </h1>
                        </div>
                      </li>
                    </Link>
                  )
                );
              })}
          </ul>
        </div>

        {/* Icons */}
        <div className="md:flex hidden items-center">
          <div
            onClick={() =>
              showProfile ? setShowProfile(false) : setShowProfile(true)
            }
            className="px-2 py-2 hidden md:block text-2xl relative cursor-pointer"
          >
            {user && user.profileImage ? (
              <img
                className="h-8 w-8 border-color_dark_pink border-[2px] rounded-full"
                src={user.profileImage}
                alt=""
              />
            ) : (
              <CiUser />
            )}

            <ul
              className={`${
                showProfile ? "flex" : "hidden"
              } flex-col items-start transition-opacity absolute py-6 px-4 pr-10 gap-2 before:h-1 before:w-8 before:bg-color_dark_pink before:-top-1 rounded-tl-none before:left-0 before:absolute bg-white border-[1px] rounded-sm top-12`}
            >
              {isUser && (
                <li className=" hover:text-color_dark_pink transition">
                  <Link
                    to={"/profile"}
                    className="text-sm flex items-center gap-2"
                  >
                    <MdOutlineArrowRight />
                    <span>Profile</span>
                  </Link>
                </li>
              )}
              {isUser && (
                <li className=" hover:text-color_dark_pink transition">
                  <Link
                    to={"/address"}
                    className="text-sm flex items-center gap-2"
                  >
                    <MdOutlineArrowRight />
                    <span>Address</span>
                  </Link>
                </li>
              )}

              {isUser && (
                <li className=" hover:text-color_dark_pink transition">
                  <Link
                    to={"/order"}
                    className="text-sm flex items-center gap-2"
                  >
                    <MdOutlineArrowRight />
                    <span>Orders</span>
                  </Link>
                </li>
              )}

              {isUser && (
                <li className=" hover:text-color_dark_pink transition">
                  <Link className="text-sm flex items-center gap-2">
                    <MdOutlineArrowRight />
                    <span>Notifications</span>
                  </Link>
                </li>
              )}

              {isUser && (
                <li className=" hover:text-color_dark_pink transition">
                  <Link
                    to={"/payment"}
                    className="text-sm flex items-center gap-2"
                  >
                    <MdOutlineArrowRight />
                    <span>Payments</span>
                  </Link>
                </li>
              )}

              {isUser && (
                <li className=" hover:text-color_dark_pink transition">
                  <Link
                    onClick={handleLogout}
                    className="text-sm flex items-center gap-2"
                  >
                    <MdOutlineArrowRight />
                    <span>Logout</span>
                  </Link>
                </li>
              )}

              {!isUser && (
                <li className=" hover:text-color_dark_pink transition">
                  <Link
                    to={"/signup"}
                    className="text-sm flex items-center gap-2"
                  >
                    <MdOutlineArrowRight />
                    <span>Signup</span>
                  </Link>
                </li>
              )}
              {!isUser && (
                <li className=" hover:text-color_dark_pink transition">
                  <Link
                    to={"/login"}
                    className="text-sm flex items-center gap-2"
                  >
                    <MdOutlineArrowRight />
                    <span>Login</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
          {!home && (
            <div
              onClick={() =>
                navigate(isUser ? "/feature" : "/login", {
                  state: { title: "Wishlist", data: user?.wishlist },
                })
              }
              className="px-2 text-2xl relative cursor-pointer"
            >
              <CiHeart />
              {user.wishlist?.length > 0 && (
                <div className="bg-color_dark_pink text-white rounded-full h-4 w-4 flex items-center justify-center absolute right-1 -top-0 text-xs">
                  {user?.wishlist?.length}
                </div>
              )}
            </div>
          )}

          {home === true && (
            <div className="px-2 text-2xl relative cursor-pointer">
              <CiHome />
            </div>
          )}
          <div
            onClick={() => navigate("/cart")}
            className="px-2  text-2xl relative cursor-pointer"
          >
            <CiShoppingCart />
            {items.length > 0 && (
              <div className="absolute right-0 -top-1 h-4 w-4 text-sm text-white rounded-full flex items-center justify-center bg-color_dark_pink">
                {items.length}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Phone Navbar */}
      <div className="px-4 mx-auto shadow-sm shadow-color_pink py-4 md:hidden flex items-center justify-between">
        {/* Input */}
        {/* <div className="flex items-center h-[46px] max-w-[260px] my-2 bg-white hover:border-gray-200 hover:bg-white border-[1px]  md:py-1 py-2 rounded-md">
        

        </div> */}
        <div className="text-3xl tracking-wide  my-2 md:my-0 font-bold">
          StyleVow
        </div>
        {/* Icons */}
        <div className="flex items-center">
          <div
            onClick={() => navigate("/explore")}
            className="px-2 text-3xl relative cursor-pointer"
          >
            <CiSearch className="" />
          </div>

          <div
            onClick={() =>
              navigate(isUser ? "/feature" : "/login", {
                state: { title: "Wishlist", data: user?.wishlist },
              })
            }
            className="px-2 text-3xl relative cursor-pointer"
          >
            <CiHeart />
            {user.wishlist?.length > 0 && (
              <div className="bg-color_dark_pink text-white rounded-full h-4 w-4 flex items-center justify-center absolute right-1 -top-0 text-xs">
                {user?.wishlist?.length}
              </div>
            )}
          </div>

          {/* <div className="px-2 text-3xl relative cursor-pointer">
            <CiShoppingCart />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
