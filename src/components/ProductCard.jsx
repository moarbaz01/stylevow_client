import React, { useMemo, useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import useRating from "../hooks/useRating";
import { apiRequest } from "../services/ApiService";
import { fetchUser } from "../redux/slicers/auth";

function ProductCard({ props }) {
  const { _id, rating, images, category, title, price, cutPrice } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [selectHeart, setSelectHeart] = useState(false);
  const notify = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const stars = useRating(rating);
  const dispatch = useDispatch();

  useEffect(() => {
    // Simulating data fetching
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const isProductInWishlist = useMemo(() => {
    return user?.wishlist?.some((product) => product._id === _id);
  }, [user, _id]);

  const updateWishlist = useCallback(async () => {
    if (user?.wishlist) {
      if (isProductInWishlist) {
        setSelectHeart(false);
        notifyError("Product removed from wishlist");
        await apiRequest.delete(`/profile/wishlist/${_id}`);
      } else {
        setSelectHeart(true);
        notify("Product added in wishlist");
        await apiRequest.post("/profile/wishlist", { productId: _id });
      }
      dispatch(fetchUser());
    } else {
      notifyError("YOU ARE NOT LOGGED IN USER");
    }
  }, [isProductInWishlist, dispatch, _id]);

  return (
    <div
      className="cursor-pointer  flex items-center justify-center"
      onClick={() => navigate(`/product/${_id}`)}
    >
      <div
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
        className={`flex md:max-w-[300px]  overflow-hidden w-full flex-col relative md:max-h-[420px] rounded-sm shadow-md md:px-2 py-2 px-2 md:py-2 border-[1px] `}
      >
        {/* Overflow Icons */}
        <div
          className={`absolute top-0 left-0 hidden h-full gap-2 z-10 justify-center items-center transition w-full bg-black_gradient ${
            isVisible && "md:flex"
          }`}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              updateWishlist();
            }}
            className={`rounded-full p-2 hover:opacity-60 transition ${
              isProductInWishlist || selectHeart
                ? "bg-color_dark_pink"
                : "bg-white/50"
            } text-color_black text-xl`}
          >
            <CiHeart />
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${_id}`);
            }}
            className="bg-white/50 rounded-full p-2 hover:opacity-60 transition text-color_black text-xl"
          >
            <CiShoppingCart />
          </div>
        </div>
        <div className="p-2 w-full mx-auto flex items-center justify-center my-auto">
          <img
            className="group-hover/scale:scale-[1.1] object-scale-down h-[120px] w-[120px] transition rounded-lg md:h-[280px] md:w-full"
            src={images[0]}
            alt={title}
            onError={(e) => {
              e.target.src = "path/to/placeholder/image.jpg"; // Fallback image
            }}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-start flex-col gap-1">
            <span className="text-[12px] font-bold text-color_dark_pink">
              {category.name}
            </span>
            <p className="text-md font-bold text-ellipsis whitespace-nowrap overflow-hidden max-w-full md:max-w-[200px]">
              {title}
            </p>
          </div>
          <div className="flex items-center mt-1 gap-1">
            {stars.map((star, index) => (
              <React.Fragment key={index}>{star}</React.Fragment>
            ))}
          </div>
          <div className="flex items-center mt-1 gap-6">
            <span className="font-bold text-xl">₹{price}</span>
            <span className="line-through text-color_dark_pink text-lg">
              ₹{cutPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
