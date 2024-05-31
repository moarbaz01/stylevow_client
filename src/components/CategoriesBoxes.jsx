import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { apiRequest } from "../services/ApiService";

function CategoriesBoxes() {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  function fetchCategories() {
    apiRequest
      .get("/category/all")
      .then((res) => {
        setCategoryData(res.data.categories);
        // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.log(err);
        // Ensure loading state is updated on error as well
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchCategories();
  }, []); // Added empty dependency array to ensure fetchCategories is called once

  return (
    <div className="md:grid md:grid-cols-3 lg:grid-cols-4 mt-6 w-full flex md:overflow-auto overflow-x-scroll px-2 md:ml-0 gap-4">
      {loading
        ? Array(8)
            .fill()
            .map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <Skeleton height={100} width={100} />
                <Skeleton width={80} />
              </div>
            ))
        : categoryData.map((category, index) => {
            return (
              <Link
                to={"/feature"}
                state={{ data: category.products, title: category.name }}
                key={index}
                className="flex flex-col items-center "
              >
                <div className="size-24 md:size-fit md:py-4 md:w-[100%] flex items-center flex-col md:flex-row md:border-b-2 border-[2px] border-color_dark_pink md:rounded-md rounded-full shadow-sm justify-center md:justify-around">
                  <img
                    src={category.image}
                    className="md:size-24 md:rounded-none rounded-full"
                    alt={category.name}
                  />
                  <div className="md:flex hidden flex-col items-center">
                    <span className="text-sm">{category.name}</span>
                    <span className="text-[12px] text-color_dark_pink flex items-center hover:opacity-80">
                      <IoIosArrowForward className="mr-1" /> Show All
                    </span>
                  </div>
                </div>
                <span className="md:hidden mt-1 font-[400] text-xs">
                  {category.name}
                </span>
              </Link>
            );
          })}
    </div>
  );
}

export default CategoriesBoxes;
