import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import useRating from "../hooks/useRating";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TiStarFullOutline } from "react-icons/ti";
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { addToCart } from "../redux/slicers/cart";
import { fetchUser } from "../redux/slicers/auth";
import { PiArrowLeft, PiHeart, PiHeartFill } from "react-icons/pi";
import UserReview from "./UserReview";
import { apiRequest } from "../services/ApiService";
import ProductViewSkeleton from "./ProductViewSkeleton";

const ProductView = () => {
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [selectHeart, setSelectHeart] = useState(false);
  const [amount, setAmount] = useState(1);
  const [product, setProduct] = useState({});
  const { user, isUser } = useSelector((state) => state.auth);
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const rating = useRating(5);
  const dispatch = useDispatch();
  const [addDetails, setAddDetails] = useState(true);
  const [loading, setLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  const notify = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const navigate = useNavigate();
  const topRef = useRef();
  const [activeImg, setActiveImage] = useState("");

  useEffect(() => {
    topRef.current?.scrollIntoView();
  }, [productId]);

  const truncate = (str, maxLength) => {
    if (!str) return "";
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + "...";
  };

  const fetchProduct = () => {
    setProductLoading(true);
    apiRequest
      .post("/products/get", {
        productId: productId,
      })
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((err) => console.error(err))
      .finally(() => setProductLoading(false));
  };

  const isProductInWishlist = useMemo(() => {
    return user?.wishlist?.some((product) => product._id === productId);
  }, [user, productId]);

  const updateWishlist = useCallback(async () => {
    if (isUser) {
      if (isProductInWishlist) {
        notifyError("Removed")
        setSelectHeart(false);
        await apiRequest.delete(`/profile/wishlist/${productId}`);
      } else {
        setSelectHeart(true);
        notify("Added")
        await apiRequest.post("/profile/wishlist", { productId: productId });
      }
      dispatch(fetchUser());
    } else {
      notifyError("YOU ARE NOT LOGGED IN USER");
    }
  }, [isProductInWishlist, dispatch, productId, user]);

  const relatedProducts = useMemo(() => {
    if (!product.category) return [];
    return product.category.products.filter((item) => item._id !== productId);
  }, [product]);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    setActiveImage(product.images && product.images[0]);
  }, [product]);

  const handleAddToCart = async () => {
    setLoading(true);
    if (isUser) {
      if (!size || !color) {
        setLoading(false);
        notifyError("Please select color and size");
      } else {
        apiRequest
          .post(`/cart/create`, {
            productId: product._id,
            quantity: amount,
            color: color,
            size: size,
            totalAmount: product.price * amount,
          })
          .then((res) => {
            const cartItem = {
              product: product,
              color: color,
              size: size,
              quantity: amount,
              totalAmount: product.price * amount,
              _id: res.data.cart._id,
            };
            dispatch(addToCart(cartItem));
            dispatch(fetchUser());
            notify("Product added to cart");
          })
          .catch((err) => {
            notifyError(err.response.data.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } else {
      notifyError("Please login to add to cart");
      setLoading(false);
    }
  };

  if (productLoading) {
    return <ProductViewSkeleton />;
  }

  return (
    product && (
      <div>
        {/* Product top */}

        <div ref={topRef}></div>
        {/* Navigation */}
        <div className="md:h-12 md:hidden h-16 px-6 my-2 tracking-wide w-full flex items-center justify-between md:justify-center md:text-sm">
          <PiArrowLeft
            onClick={() => navigate(-1)}
            cursor="pointer"
            fontSize="2rem"
          />
          {isProductInWishlist || selectHeart ? (
            <PiHeartFill
              onClick={updateWishlist}
              fill="#FF92A5"
              className="text-4xl"
            />
          ) : (
            <PiHeartFill onClick={updateWishlist} className=" text-4xl" />
          )}
        </div>

        <div className="flex flex-col md:w-[80%] md:mx-auto pb-6 justify-between md:mb-24 lg:flex-row gap-4 lg:items-start">
          <div className="flex flex-col w-full justify-center gap-6 md:mt-0 mt-4 lg:w-2/4">
            <div className="relative">
              {product.images && (
                <img
                  src={activeImg || product.images[0]}
                  alt=""
                  className="w-[90%] md:w-full max-h-full mx-auto object-scale-down aspect-square rounded-xl"
                  onError={(e) => {
                    console.error("Image loading error:", e);
                    setActiveImage("path/to/placeholder/image.jpg"); // fallback image
                  }}
                />
              )}
            </div>
            <div className="flex items-center px-2 md:px-0 md:justify-center w-full overflow-x-scroll gap-2 ">
              {product.images &&
                product.images.map((p, index) => (
                  <img
                    key={index}
                    src={p}
                    alt=""
                    className=" max-w-full max-h-28 md:max-h-36 cursor-pointer aspect-auto rounded-xl"
                    onClick={() => setActiveImage(p)}
                  />
                ))}
            </div>
          </div>
          {/* ABOUT */}
          <div className="flex flex-col  mt-0 w-[90%] md:pl-0 pl-6 gap-4 lg:w-2/4">
            <div>
              <span className="text-color_dark_pink font-semibold">
                {product.additionalDetails?.brand || product.category?.name}
              </span>
              <h1 className="text-3xl font-bold">{product.title}</h1>
            </div>
            <div className="flex">
              <div className="flex items-center">{}</div>
              <span className="ml-2 flex items-center gap-1">
                {rating.map((r, index) => (
                  <TiStarFullOutline key={index} />
                ))}
                | {product.reviews?.length} Customer reviews
              </span>
            </div>
            <p className="text-gray-700">{truncate(product.desc, 150)}</p>
            <div className="flex items-center gap-6">
              <h6 className="text-3xl font-semibold">₹{product.price}</h6>
              <h6 className="text-3xl opacity-80 text-color_dark_pink font-bold line-through">
                ₹{product.cutPrice}
              </h6>
              <h6 className=" text-color_dark_pink font-bold text-2xl">
              -{Math.round(((product.cutPrice - product.price) / product.cutPrice) * 100)}%
            </h6>
            </div>

            {/* Colors */}
            <div className="flex items-start flex-col my-2 gap-2">
              <span className="text-gray-400 text-base font-bold">Color :</span>
              <div className="flex items-center flex-wrap gap-2">
                {product.color &&
                  product.color.map((col, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setColor(col);
                        notify(`Selected : ${col}`);
                      }}
                      style={{ backgroundColor: col.toLowerCase() }}
                      className={`md:h-8 md:w-8 h-12 w-12 p-2 hover:opacity-50 rounded-full cursor-pointer ${
                        color === col
                          ? "border-[4px] border-color_dark_pink"
                          : "border-[2px] border-gray"
                      }`}
                    ></div>
                  ))}
              </div>
            </div>
            {/* Size */}
            <div className="flex items-start flex-col my-2 gap-2">
              {product?.size?.length > 0 && (
                <span className="text-gray-400 text-base font-bold">
                  Size :
                </span>
              )}
              <div className="flex items-center md:flex-nowrap flex-wrap gap-2">
                {product?.size?.length > 0 &&
                  product.size.map((s, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSize(s);
                        notify(`Selected : ${s}`);
                      }}
                      className={`md:h-12 md:w-12 md:mr-0 mr-1 h-16 w-16 flex items-center justify-center p-2 transition rounded-full cursor-pointer ${
                        size === s
                          ? "bg-gray-200 border-[1px] border-gray"
                          : "hover:bg-gray-200 bg-white border-[1px] border-gray"
                      }`}
                    >
                      {s.toUpperCase()}
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex md:flex-row flex-col items-start md:items-end gap-12">
              <div className="md:flex flex-col items-start gap-2">
                <span className="text-gray-400 hidden md:block text-base font-bold">
                  Quantity :
                </span>
                <div className="flex flex-row items-center">
                  <button
                    className="bg-gray-200 py-2 px-5 rounded-lg text-3xl"
                    onClick={() =>
                      setAmount((prev) => (prev > 1 ? prev - 1 : 1))
                    }
                  >
                    -
                  </button>
                  <span className="py-4 px-6 w-16 rounded-lg">{amount}</span>
                  <button
                    className="bg-gray-200 py-2 px-4 rounded-lg text-3xl"
                    onClick={() =>
                      setAmount((prev) => (prev < 5 ? prev + 1 : prev))
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="w-full">
                <button
                  onClick={handleAddToCart}
                  className="bg-color_dark_pink text-white hover:bg-color_pink transition font-semibold md:py-3 py-6 whitespace-nowrap text-center w-full md:px-16 rounded-lg h-full"
                >
                  {loading ? (
                    <i className="fa text-white text-lg fa-spinner fa-spin"></i>
                  ) : (
                    "Add To Cart"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Phone Additional Details */}
        <div className="w-full px-4 py-4 md:w-[80%] bg-pink-50 items-center md:mx-auto">
          <div className="flex md:px-4 md:py-2 md:my-0 my-2 justify-between">
            <h1 className="font-[600] text-black text-lg">Review Product</h1>
            <Link
              to={`/reviews/${productId}`}
              state={product.reviews}
              className="text-color_dark_pink text-lg font-[600]"
            >
              {product.reviews?.length > 0
                ? `See All ${product.reviews?.length} Reviews`
                : "Add Review"}
            </Link>
          </div>

          {/* Reviews */}
          <div className=" py-4 rounded-xl">
            {product.reviews?.length > 0 ? (
              product.reviews?.map((e, index) => (
                <UserReview key={index} props={e} />
              ))
            ) : (
              <span className="md:ml-4">No Reviews</span>
            )}
          </div>
        </div>

        <div className="md:w-[80%] mt-6 w-full px-4 md:mx-auto">
          <div
            onClick={() => setAddDetails(!addDetails)}
            className="flex md:px-4 md:my-0 my-2 justify-between"
          >
            <h1 className="font-[600] text-black text-lg">Product Details</h1>
            <span className="text-color_dark_pink md:hidden text-lg font-[600]">
              {addDetails ? "Hide" : "Show"}
            </span>
          </div>

          {addDetails && (
            <div className="md:mx-2 my-4">
              <ul className="flex items-center flex-col w-full">
                {product && product.additionalDetails ? (
                  Object.entries(product.additionalDetails).map(
                    (detail, index) => (
                      <li
                        key={index}
                        className="flex w-full bg-slate-50 my-1 justify-between md:px-2 py-2"
                      >
                        <span className="text-gray-400">{detail[0]}</span>
                        <span className="text-gray-600 pl-6">{detail[1]}</span>
                      </li>
                    )
                  )
                ) : (
                  <li>No Details</li>
                )}
              </ul>
            </div>
          )}
        </div>
        {/* Product Bottom */}
        {relatedProducts?.length > 0 ? (
          <div className="max-w-[1080px] mx-auto">
            <div className="flex md:block items-center mx-4 md:mx-2 md:my-0 my-4 justify-between">
              <h1 className="text-center hidden md:block my-6 font-bold text-4xl">
                Related Products
              </h1>
              <h1 className="md:hidden font-[600] text-black text-lg">
                You May Also Like This
              </h1>
              <Link
                to={"/feature"}
                state={{ title: "Related Products", data: relatedProducts }}
                className="md:hidden text-color_dark_pink text-lg font-[600]"
              >
                See More
              </Link>
            </div>
            <div className="md:my-16 my-2 mb-28">
              <Products data={relatedProducts} limit={4} />
            </div>
          </div>
        ) : (
          <div className="md:my-16 my-2 mb-28"></div>
        )}
      </div>
    )
  );
};

export default ProductView;
