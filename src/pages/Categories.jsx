import React from "react";
import CategoriesBoxes from "../components/CategoriesBoxes";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";

function Categories() {
  return (
    <div>
      <div className=" hidden md:block">
        <Announcement />
      </div>
      <div className="hidden md:block">
        <Navbar />
      </div>

      <div className=" h-20 bg-white border-b-[1px] md:hidden  w-full flex items-center justify-start px-4 shadow-sm">
        <Link to="/">
          <h1 className=" text-xl font-[600] ">&lt; Category</h1>
        </Link>
      </div>
      {/* Phone Navbar */}

      {/* All Categories */}
      <div className="mx-4 mt-4">
        <h1 className=" text-lg"> All Categories</h1>
      </div>
      <div className=" flex flex-wrap pb-[200px] items-center ">
        <CategoriesBoxes/>
      </div>
      <div className=" hidden md:block">
        <Footer />
      </div>
    </div>
  );
}
export default Categories;
