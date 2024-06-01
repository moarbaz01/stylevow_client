import React, { useCallback, useMemo } from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import { Link } from "react-router-dom";
import CategoriesBoxes from "../components/CategoriesBoxes";
import Products from "../components/Products";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Instructions from "../components/Instructions";
import { apiRequest } from "../services/ApiService";
import DealOfTheDay from "../components/DealOfTheDay";

function Home() {
  const [products, setProducts] = useState([]);

  // Fetch Products
  const fetchProducts = () => {
    apiRequest
      .get("/products/all")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  };

  // New Arrivals products
  const newArrivalsProducts = useMemo(
    () => products.sort((a, b) => a.createdAt - b.createdAt),
    [products, products.length !== 0]
  );

  // Best Selling Product
  const bestSellingProducts = useMemo(
    () => products.sort((a, b) => b.sold - a.sold),
    [products, products.length !== 0]
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="">
      <Announcement />
      <Navbar />
      <Banner title={"New Arrivals"} data={[newArrivalsProducts]} />
      <Instructions />

      {/* Categories */}
      <div className="max-w-[1080px] mx-auto mb-12">
        <div className="flex md:block items-center mx-2 justify-between ">
          <h1 className="text-center hidden md:block text-black text-2xl font-[500]  ">
            Shop By Category
          </h1>
          <h1 className="  md:hidden font-[600]  text-black text-lg  ">
            Category
          </h1>
          <Link
            to="/categories"
            className="md:hidden text-color_dark_pink text-lg font-[600] "
          >
            More Category
          </Link>
        </div>
        <CategoriesBoxes />
      </div>

      {/* <DealOfTheDay/> */}

      {/* New Arrivals */}
      <div className="max-w-[1080px] mx-auto">
        <div className="flex md:block items-center mx-2 md:my-0 my-2 justify-between ">
          <h1 className="text-center mb-4 hidden md:block text-black text-2xl font-[500]  ">
            New Arrivals
          </h1>
          <h1 className="  md:hidden font-[600]  text-black text-lg  ">
            New Arrivals
          </h1>
          <Link
            to={`/feature`}
            state={{ data: newArrivalsProducts, title: "New Arrivals" }}
            className="md:hidden text-color_dark_pink text-lg font-[600] "
          >
            See More
          </Link>
        </div>
        <Products data={newArrivalsProducts} />
        <Link
          to={`/feature`}
          state={{ data: newArrivalsProducts, title: "New Arrivals" }}
          className="my-8 hidden md:block text-center"
        >
          <button className="bg-color_dark_pink py-2 hover:bg-color_pink transition text-white rounded-sm text-sm px-6 ">
            View All
          </button>
        </Link>
      </div>

      {/* Horizontal Line */}
      <div className=" h-1 rounded-lg md:hidden bg-gray-100 w-[40%] drop-shadow-sm mx-auto mt-6"></div>

      {/* Top Rated */}
      <div className="max-w-[1080px] mt-8 mx-auto">
        <div className="flex md:block items-center mx-2 md:my-0 my-2 justify-between ">
          <h1 className="text-center mb-4 hidden md:block text-black text-2xl font-[500]  ">
            Best Selling
          </h1>
          <h1 className="  md:hidden font-[600]  text-black text-lg  ">
            Best Selling
          </h1>
          <Link
            to={`/feature`}
            state={{ data: bestSellingProducts, title: "Best Selling" }}
            className="md:hidden text-color_dark_pink text-lg font-[600] "
          >
            See More
          </Link>
        </div>
        <Products data={bestSellingProducts} />
        <Link
          to={`/feature`}
          state={{ data: bestSellingProducts, title: "Best Selling" }}
          className="my-8 text-center hidden md:block"
        >
          <button className="bg-color_dark_pink py-2 hover:bg-color_pink transition text-white rounded-sm text-sm px-6 ">
            View All
          </button>
        </Link>
      </div>

      {/* Horizontal Line */}
      <div className=" h-1 rounded-lg md:hidden  bg-gray-100 w-[40%] drop-shadow-sm mx-auto mt-6"></div>

      <Footer />
    </div>
  );
}

export default Home;
