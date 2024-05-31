import React, { useCallback, useEffect, useMemo, useState } from "react";
import Announcement from "../components/Announcement";
import { Link, useParams } from "react-router-dom";
import Products from "../components/Products";
import Footer from "../components/Footer";
import usePagination from "../hooks/usePagination";
import { CiFilter } from "react-icons/ci";
import Product404 from "../components/Product404";
import { CiSearch } from "react-icons/ci";
import { apiRequest } from "../services/ApiService";
import Navbar from "../components/Navbar";
import FilterSearch from "../components/FilterSearch";

function ProductSearch() {
  const { q } = useParams();
  const [query, setQuery] = useState(q || "");
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(8);
  const [border, setBorder] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortPrice, setSortPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filterModal, setFilterModal] = useState(false);
  const [results, setResults] = useState([]);

  const fetchProducts = () => {
    apiRequest
      .get("/products/all")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err.response?.data?.message || err.message));
  };

  // Query Products
  const queryProducts = useMemo(() => {
    return products.filter((e) =>
      e.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [products, query]);

  // Filter and Sort Products
  useEffect(() => {
    let temp = [...queryProducts];

    if (selectedColors.length > 0) {
      temp = temp.filter((p) =>
        p.color.some((c) => selectedColors.includes(c))
      );
    }

    if (selectedSizes.length > 0) {
      temp = temp.filter((p) =>
        p.size.some((s) => selectedSizes.includes(s.toLowerCase()))
      );
    }

    if (minPrice) {
      temp = temp.filter((p) => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      temp = temp.filter((p) => p.price <= Number(maxPrice));
    }

    if (sortPrice) {
      temp.sort((a, b) =>
        sortPrice === "asc" ? a.price - b.price : b.price - a.price
      );
    }

    if (sortOrder) {
      temp.sort((a, b) =>
        sortOrder === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    setResults(temp);
  }, [
    queryProducts,
    selectedColors,
    selectedSizes,
    minPrice,
    maxPrice,
    sortOrder,
    sortPrice,
  ]);

  // Sort all colors of products
  const queryProductsColors = useMemo(() => {
    const items = [];
    queryProducts.forEach((p) => {
      if (p.color) {
        p.color.forEach((c) => {
          if (!items.includes(c.toLowerCase())) {
            items.push(c.toLowerCase());
          }
        });
      }
    });
    return items;
  }, [queryProducts]);

  // Fetch all sizes of products
  const queryProductsSizes = useMemo(() => {
    const items = [];
    queryProducts.forEach((p) => {
      if (p.size) {
        p.size.forEach((s) => {
          if (!items.includes(s.toLowerCase())) {
            items.push(s.toLowerCase());
          }
        });
      }
    });
    return items;
  }, [queryProducts]);

  const { currentPage, maxPages, next, prev, jump, currentData } =
    usePagination(results, limit);

  const generatePaginationBox = () => {
    const paginationBox = [];
    for (let i = 1; i <= maxPages; i++) {
      paginationBox.push(i);
    }
    return paginationBox;
  };

  const handleSelectColors = (color) => {
    setSelectedColors((prev) => {
      return prev.includes(color)
        ? prev.filter((e) => e !== color)
        : [...prev, color];
    });
  };

  const handleSelectSizes = (size) => {
    setSelectedSizes((prev) => {
      return prev.includes(size)
        ? prev.filter((e) => e !== size)
        : [...prev, size];
    });
  };

  const handleCloseFilterModal = () => {
    setFilterModal(false);
    document.body.style.overflowY = "auto";
  };

  useEffect(() => {
    setQuery(q);
  }, [q]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Debugging logs
    console.log("Sort Price: ", sortPrice);
    console.log("Sort Order: ", sortOrder);
    console.log("Filtered and Sorted Results: ", results);
  }, [results]);

  return (
    <div>
      <div className="hidden md:block">
        <Announcement />
        <Navbar />
      </div>
      {/* Phone Navbar */}
      <div
        className={`bg-white md:hidden z-[9999] border-b-[1px] border-gray-200 mx-auto`}
      >
        <div className="mx-auto py-4 flex items-center justify-evenly">
          <div
            className={`flex items-center w-[80%] md:w-[60%] gap-4  ${
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
              placeholder={!border && "Search product"}
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <Link
              to={`/products/search/${query}`}
              className={`text-3xl cursor-pointer`}
            >
              <CiSearch
                className={`${
                  border ? "text-color_dark_pink" : "text-gray-500"
                }`}
              />
            </Link>
          </div>
          <div className="flex md:hidden items-center gap-1">
            <div
              onClick={() => setFilterModal(true)}
              className=" text-color_dark_pink   text-3xl"
            >
              <CiFilter className="stroke-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Phone Filters */}

      {/* Results */}
      <div className="mt-4 md:hidden flex justify-between mx-4">
        <div className="text-black text-xl font-[500]">
          {results.length} : Results
        </div>

        <div className="flex items-center gap-2 flex-col ">
          <select
            name="price"
            className="text-[12px] outline-none bg-white border-[1px] cursor-pointer p-2"
            onChange={(e) => setSortPrice(e.target.value)}
          >
            <option value="">Price</option>
            <option value="desc">Highest to lowest</option>
            <option value="asc">Lowest to highest</option>
          </select>
          <select
            name="products"
            className="text-[12px] outline-none bg-white border-[1px] cursor-pointer p-2"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Products</option>
            <option value="desc">Newest to oldest</option>
            <option value="asc">Oldest to newest</option>
          </select>
        </div>
      </div>

      {/* Products Searching */}
      <div className="flex gap-4">
        {/* Selection Left */}
        <div className="flex-[1] pl-2 lg:flex md:hidden hidden flex-col items-start  ">
          {/* Price Box */}
          <div className="bg-gray-100 w-full p-4 my-2">
            <h1 className="font-bold">Prices</h1>
            <div>
              <div className="flex items-center justify-between my-2">
                <span className="text-xs">Range</span>
                <span className="text-xs">₹0 - ₹50000</span>
              </div>
              <div className="h-16 mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
                <input
                  type="text"
                  className="h-12 w-full bg-transparent  outline-none"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className="h-16 mt-4 flex mx-auto items-center border-2 gap-2 px-1 border-gray-200  ">
                <input
                  type="text"
                  className="h-12 w-full bg-transparent  outline-none"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Color Box */}
          <div className="bg-gray-100 w-full p-4 my-2">
            <h1 className="font-bold">Color</h1>
            <div className="flex flex-col">
              <h1 className=" text-sm my-1">Choose colors</h1>
              <div className="flex flex-wrap">
                {queryProductsColors.map((col, index) => (
                  <div
                    onClick={() => handleSelectColors(col)}
                    key={index}
                    style={{ backgroundColor: col }}
                    className={`rounded-full ${
                      selectedColors.includes(col) && " border-color_dark_pink"
                    } w-8 m-1 h-8 cursor-pointer p-1 border-[1px] `}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Size Box */}
          <div className="bg-gray-100 w-full p-4 my-2">
            <h1 className="font-bold">Sizes</h1>
            <div className="flex flex-col">
              <h1 className=" text-sm my-1">Choose sizes</h1>
              <div className="flex flex-wrap">
                {queryProductsSizes.map((s, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectSizes(s)}
                    className={`w-[40px] h-[30px] ${
                      selectedSizes.includes(s) && " bg-gray-200"
                    } m-1 cursor-pointer text-sm flex items-center justify-center border-[1px] border-gray-200`}
                  >
                    {s.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Right */}
        <div className="flex-[5]">
          <div className="h-12 hidden bg-gray-100 md:flex items-center justify-between my-4 px-2">
            <div className=" text-xl">RESULTS : {results.length}</div>
            <div>
              <span>Sort by : </span>
              <select
                name="price"
                className="text-[12px] cursor-pointer mx-2 p-1"
                onChange={(e) => setSortPrice(e.target.value)}
              >
                <option disabled>Price</option>
                <option value="desc">Highest to lowest</option>
                <option value="asc">Lowest to highest</option>
              </select>
              <select
                name="products"
                className="text-[12px] cursor-pointer mx-2 p-1 "
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Products</option>
                <option value="asc">Newest to oldest</option>
                <option value="desc">Oldest to newest</option>
              </select>
              <span className="text-sm ml-4">Show :</span>
              <select
                name="priceSort"
                className="text-[12px] cursor-pointer mx-2 p-1 "
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                <option value="8">8</option>
                <option value="12">12</option>
                <option value="16">16</option>
              </select>
            </div>
            <div
              className="md:flex lg:hidden cursor-pointer items-center gap-2 hidden"
              onClick={() => setFilterModal(true)}
            >
              <span>Filter :</span>{" "}
              <CiFilter className="stroke-1 text-color_dark_pink   text-2xl" />
            </div>
          </div>

          {/* Products */}
          {currentData().length > 0 ? (
            <div className="mt-4 md:mt-0">
              <Products data={currentData()} limit={limit} />
            </div>
          ) : (
            <div className="md:mt-0 mt-8">
              <Product404
                props={{
                  symbol: "!",
                  title: "0 Results",
                  para: "Search Another Product",
                }}
              />
            </div>
          )}
          {/* Pagination */}
          {maxPages !== 0 && (
            <div className="mt-4 mb-24">
              <div className="my-4 flex items-center justify-center">
                <button
                  onClick={() => prev()}
                  className={` ${
                    currentPage === 1 && "cursor-not-allowed"
                  } rounded-full h-8 w-8 bg-color_dark_pink text-white flex items-center justify-center`}
                >
                  &lt;
                </button>
                {generatePaginationBox().map((item) => (
                  <button
                    key={item}
                    onClick={() => jump(item)}
                    className={` ${
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
                  className={` ${
                    currentPage === maxPages && "cursor-not-allowed"
                  } rounded-full h-8 w-8 bg-color_dark_pink text-white flex items-center justify-center`}
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>

      <FilterSearch
        isOpen={filterModal}
        onClose={handleCloseFilterModal}
        sizes={queryProductsSizes}
        colors={queryProductsColors}
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
        selectedSizes={selectedSizes}
        setSelectedSizes={setSelectedSizes}
        minPrice={minPrice}
        setMaxPrice={setMaxPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        handleSelectColors={handleSelectColors}
        handleSelectSizes={handleSelectSizes}
      />
    </div>
  );
}

export default ProductSearch;
