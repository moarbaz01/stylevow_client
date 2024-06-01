import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

// Import images directly
import bannerImage1 from "../assets/images/banner-1.jpg";
import bannerImage2 from "../assets/images/banner-2.jpg";
import bannerImage3 from "../assets/images/banner-3.jpg";

const bannerData = [
  {
    image: bannerImage1,
    title: "MODERN CLOTHES",
    subtitle: "New Arrivals",
    price: 99,
  },
  {
    image: bannerImage2,
    title: "TRENDY WEAR",
    subtitle: "Latest Collection",
    price: 199,
  },
  {
    image: bannerImage3,
    title: "SHIRT & TROUSERS",
    subtitle: "Sale",
    price: 49,
  },
];

const Banner = ({ title, productData }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // 2 seconds delay
    appendDots: (dots) => (
      <div>
        <ul className="slick-dots bottom-10 ">{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="max-w-[1080px] px-1 relative z-10 md:mx-auto my-4">
      <Slider {...settings} className=" overflow-hidden gap-2">
        {bannerData.map((item, index) => (
          <div
            key={index}
            className="relative shadow-color_pink w-full h-[40vh] md:h-[70vh] flex justify-center items-center rounded-md"
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover rounded-md"
            />
            <div className="absolute inset-0 flex items-start p-6 w-[80%] m-auto h-[80%] rounded-lg md:rounded-none md:w-full md:h-full justify-center md:pl-16 gap-4 flex-col bg-white_gradient md:bg-transparent">
              <span className="text-color_dark_pink font-semibold text-xl md:text-4xl">
                {item.subtitle}
              </span>
              <h1 className="text-3xl md:text-5xl font-[600] w-[40%]">
                {item.title}
              </h1>
              <p className="text-2xl hidden md:block font-[400] text-gray-400">
                starting at{" "}
                <span className="text-3xl font-bold text-gray-400">
                  ₹ {item.price}
                </span>
              </p>
              <Link to={"/feature"} state={{ title: item.title }}>
                <button className="bg-color_dark_pink text-white py-2 px-6 rounded-md">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
