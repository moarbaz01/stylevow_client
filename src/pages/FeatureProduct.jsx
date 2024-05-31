import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Products from "../components/Products";
import usePagination from "../hooks/usePagination";
import Product404 from "../components/Product404";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

function FeatureProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { title, data = [] } = location.state;
  const [wishlistData, setWishlistData] = useState([]);

  useEffect(() => {
    setWishlistData(user?.wishlist || []);
  }, [user?.wishlist]);

  const query = title === "Wishlist" ? wishlistData : data;

  const { currentData, currentPage, next, prev, jump, maxPages } =
    usePagination(query, 8);
  const topRef = useRef();

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const generatePaginationBox = () => {
    const paginationBox = [];
    for (let i = 1; i <= maxPages; i++) {
      paginationBox.push(i);
    }
    return paginationBox;
  };

  useEffect(() => {
    generatePaginationBox();
  }, [maxPages]);

  return (
    <div>
      <div ref={topRef}></div>
      <div className="md:block hidden">
        <Announcement />
      </div>
      <div className="md:block hidden">
        <Navbar />
      </div>
      <div className="h-20 bg-white border-b-[1px] md:border-none w-full flex items-center justify-start px-4 shadow-sm md:shadow-none">
        <h1
          onClick={() => navigate(-1)}
          className="cursor-pointer text-xl font-[600]"
        >
          &lt; {title}
        </h1>
      </div>
      <div className="mt-4 max-w-[1080px] mx-auto">
        {query && query.length !== 0 ? (
          <Products data={currentData()} />
        ) : (
          <Product404
            props={{
              symbol: "!",
              title: "No Products",
              para: "Explore other categories",
              navigate: "GO TO HOME",
              redirect: "/",
            }}
          />
        )}
      </div>

      {/* Pagination */}
      {maxPages > 0 && (
        <div className="mt-6 md:mb-6 mb-24">
          <div className="flex items-center justify-center">
            <button
              onClick={() => prev()}
              className={`${
                currentPage === 1 && "cursor-not-allowed"
              } rounded-full h-8 w-8 bg-color_dark_pink text-white flex items-center justify-center`}
            >
              &lt;
            </button>
            {generatePaginationBox().map((item) => (
              <button
                key={item}
                onClick={() => jump(item)}
                className={`${
                  currentPage === item
                    ? "bg-color_dark_pink text-white"
                    : "text-color_dark_pink"
                } rounded-full h-8 w-8 mx-1 flex items-center justify-center`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => next()}
              className={`${
                currentPage === maxPages && "cursor-not-allowed"
              } rounded-full h-8 w-8 bg-color_dark_pink text-white flex items-center justify-center`}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
      <div className="md:block hidden">
        <Footer />
      </div>
    </div>
  );
}

export default FeatureProduct;
