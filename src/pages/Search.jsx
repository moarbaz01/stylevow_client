import { CanceledError } from "axios";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { apiRequest } from "../services/ApiService";

function Search() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState([]);
  const [border, setBorder] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const fetchProducts = async () => {
    try {
      const res = await apiRequest.get(`/products/all`);
      setProducts(res.data.products);
    } catch (error) {
      if (error instanceof CanceledError) return;
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

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [query]);

  return (
    <div>
      <div className=" h-24 flex items-center md:hidden border-b-[1px] shadow-sm px-4  justify-between">
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
            onChange={handleChange}
            value={query}
          />
          <Link
            to={`/products/search/${query}`}
            className={`text-3xl cursor-pointer`}
          >
            <CiSearch
              className={`${border ? "text-color_dark_pink" : "text-gray-500"}`}
            />
          </Link>
          {/* <div className=" text-2xl">
            <RiDeleteBack2Line />
          </div> */}
        </div>
      </div>

      <ul className="mt-0 w-full">
        {results &&
          results.map((e, index) => {
            return (
              index < 5 && (
                <Link key={index} to={`/product/${e._id}`}>
                  <li className="flex items-start border-b-[1px] p-4">
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
  );
}

export default Search;
