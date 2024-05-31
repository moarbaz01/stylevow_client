import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MdStar } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { fetchUser } from "../redux/slicers/auth";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiRequest } from "../services/ApiService";
import MyToaster from "../components/MyToaster";

function WriteReview() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const toastError = (message) => toast.error(message);
  const toastSuccess = (message) => toast.success(message);
  const location = useLocation();
  const productId = location.pathname.split("/review/")[1];
  const dispatch = useDispatch();

  const [data, setData] = useState({
    review: "",
    rating: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = () => {
    setLoading(true);
    const form = new FormData();
    form.append("review", data.review);
    form.append("rating", parseInt(data.rating));
    form.append("productId", productId);
    files.forEach((e) => {
      form.append("images", e);
    });

    apiRequest
      .post("/review/create", form)
      .then((res) => {
        toastSuccess(res.data.message);
        dispatch(fetchUser());
        setTimeout(() => {
          navigate(-1);
        }, [2000]);
      })
      .catch((err) => {
        toastError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const fileHandler = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setFiles((prev) => [...prev, file]);
      setImages((prev) => [...prev, URL.createObjectURL(file)]);
    }
  };

  return (
    <div>
      <MyToaster />
      <div className=" hidden md:block">
        <Announcement />
      </div>
      <div className=" hidden md:block">
        <Navbar />
      </div>
      <div className=" h-20 md:hidden bg-white border-b-[1px]  w-full flex items-center justify-start px-4 shadow-sm">
        <h1
          onClick={() => navigate(-1)}
          className=" text-xl cursor-pointer font-[600] "
        >
          &lt; Write Review
        </h1>
      </div>

      <div className="md:w-1/3 md:my-2 mx-auto ">
        <h1 className=" font-[600] px-4 my-4">
          Please write Overall level of satisfaction with your shipping /
          Delivery service
        </h1>
        {/* Write Your Review */}
        <div className="mt-4 mx-4">
          <h1 className=" font-[600]">
            <MdStar className=" text-yellow-500 text-xl" />
          </h1>
        </div>

        <select
          name="rating"
          onChange={handleChange}
          className=" w-[90%] mx-4 bg-white border-[1px] mt-2 border-gray-300 p-4 outline-none"
        >
          <option value="" disabled>
            Rating
          </option>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>

        {/* Write Your Review */}
        <div className="mt-4 mx-4">
          <h1 className=" font-[600]">Write Your Review</h1>
        </div>

        <div className="mx-4 w-[90%] mt-4">
          <textarea
            name="review"
            onChange={handleChange}
            cols="25"
            rows="6"
            placeholder="Write Your Review Here"
            className=" border-[2px] w-full resize-none rounded-sm border-gray-300 outline-color_dark_pink px-2 py-4"
          ></textarea>
        </div>

        <div className="flex items-center flex-wrap">
          {images.length > 0 &&
            images?.map((i, index) => {
              return (
                <img
                  key={index}
                  src={i}
                  className=" mx-4 h-24 w-24 object-cover mt-4 bg-gray text-gray-500 border-[2px] border-gray-200"
                  alt=""
                />
              );
            })}
          <label
            htmlFor="file"
            className=" flex mx-4 items-center justify-center text-4xl h-24 w-24 mt-4 bg-gray text-gray-500 border-[2px] border-gray-200"
          >
            +
          </label>
        </div>

        <input
          className="hidden"
          onChange={fileHandler}
          type="file"
          name="file"
          id="file"
        />

        <div className="px-4 mt-12 mb-4 w-full">
          <button
            onClick={handleSubmit}
            className=" bg-color_dark_pink text-white rounded-sm text-lg font-bold h-16 shadow-lg shadow-color_dark_pink w-full"
          >
            {loading ? (
              <i className="fa text-white text-lg fa-spinner fa-spin"></i>
            ) : (
              "Review"
            )}
          </button>
        </div>
      </div>

      <div className="md:block hidden">
        <Footer />
      </div>
    </div>
  );
}

export default WriteReview;
