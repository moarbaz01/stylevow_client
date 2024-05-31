import React from "react";
import {
  CiDiscount1,
  CiHome,
  CiSearch,
  CiShoppingCart,
  CiUser,
} from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const data = [
  {
    path: "/",
    name: "Home",
    icon: CiHome,
  },
  {
    path: "/explore",
    name: "Explore",
    icon: CiSearch,
  },
  {
    path: "/cart",
    name: "Cart",
    icon: CiShoppingCart,
  },
  {
    path: "/offer",
    name: "Offer",
    icon: CiDiscount1,
  },
  {
    path: "/account",
    name: "Account",
    icon: CiUser,
  },
];

function BottomNavbar() {
  const { items } = useSelector((state) => state.cart);
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div className=" bg-white h-20 fixed md:hidden  border-t-2 border-t-gray-200 w-full bottom-0 left-0 z-[1000]">
      <div className=" flex items-center my-2 mx-4 justify-between">
        {data.map((item, i) => {
          return (
            <Link
              key={i}
              to={item.path}
              className={` flex items-center flex-col ${
                pathname === item.path && "text-color_dark_pink font-bold"
              } justify-center gap-2 relative`}
            >

              {(item.name === "Cart" && items?.length > 0 ) && <div className=" bg-color_dark_pink text-white rounded-full h-4 w-4 flex items-center justify-center top-0 right-0 text-xs absolute">{items?.length}</div>}
              <item.icon
                className={`${pathname === item.path && "stroke-1"} text-3xl`}
              />
              <span className=" text-xs">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BottomNavbar;
