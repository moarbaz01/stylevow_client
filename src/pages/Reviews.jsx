import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MdStar } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UserReview from "../components/UserReview";
import { toast } from "react-hot-toast";
import { apiRequest } from "../services/ApiService";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Reviews() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [filterRating, setFilterRating] = useState("");

  const toastError = useCallback((message) => toast.error(message), []);

  const fetchReviews = useCallback(() => {
    apiRequest
      .post("/products/get", { productId: id })
      .then((res) => setReviews(res.data.product.reviews))
      .catch((err) => toastError(err.response.data.message));
  }, [id, toastError]);

  const findUserReview = useCallback(() => {
    const temp = user.reviews?.find((e) => e.product === id);
    setMyReview(temp);
  }, [id, user.reviews]);

  const filteredReviews = useMemo(() => {
    let filtered = reviews.filter((e) => e._id !== myReview?._id);
    if (filterRating) {
      filtered = filtered.filter((review) => review.rating === filterRating);
    }
    return filtered;
  }, [reviews, myReview, filterRating]);

  const writeReview = useCallback(() => {
    if (user) {
      navigate(`/review/${id}`);
    } else {
      toastError("You did not order this product yet");
    }
  }, [user, navigate, id, toastError]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  useEffect(() => {
    findUserReview();
  }, [findUserReview]);

  return (
    <div>

      <div className=" hidden md:block">
        <Announcement />
      </div>
      <div className=" hidden md:block">
        <Navbar />
      </div>
      {/* Header */}
      <div className="h-20 bg-white border-b-[1px] md:hidden w-full flex items-center justify-start px-4 shadow-sm">
        <h1
          onClick={() => navigate(-1)}
          className="cursor-pointer text-xl font-[600]"
        >
          &lt;{" "}
          {(filteredReviews ? filteredReviews.length : reviews.length) +
            (myReview ? 1 : 0)}{" "}
          Reviews
        </h1>
      </div>

      {/* Reviews Filter */}
      <div className="flex items-center justify-between w-full md:overflow-x-auto overflow-x-scroll my-2 px-1">
        <div className="flex items-center gap-2">
          <div
            onClick={() => setFilterRating("")}
            className="flex text-nowrap cursor-pointer items-center gap-1 text-sm border-[1px] mx-1 border-gray-200 p-4 text-color_dark_pink font-bold rounded-sm"
          >
            All Reviews
          </div>

          {[5, 4, 3, 2, 1].map((e) => (
            <div
              key={e}
              onClick={() => setFilterRating(e)}
              className="w-16 mx-2 flex items-center cursor-pointer gap-1 border-[1px] border-gray-200 p-3 rounded-sm"
            >
              <MdStar className="text-red-500 text-2xl" />{" "}
              <span className="text-sm text-gray-500">{e}</span>
            </div>
          ))}
        </div>

        {reviews.length > 0 || myReview ? (
          <div className="mx-4 hidden md:block ">
            <button
              onClick={writeReview}
              className="bg-color_dark_pink text-white rounded-sm text-xl font-bold h-16 shadow-lg shadow-color_pink px-4"
            >
              Write Review
            </button>
          </div>
        ) : (
          <div className="mx-4 hidden md:block">
            <button
              onClick={writeReview}
              className="bg-color_dark_pink text-white rounded-sm text-xl font-bold h-16 shadow-lg shadow-color_pink px-4"
            >
              Write Review
            </button>
          </div>
        )}
      </div>

      {/* My Reviews */}
      {myReview && (
        <div className="w-full h-auto py-4 md:px-4 rounded-xl">
          <h1 className="px-4 my-2 font-[500]">My Reviews</h1>
          <UserReview props={myReview} />
        </div>
      )}

      {/* Reviews */}
      <div className="w-full h-auto md:min-h-[50vh] py-4 md:px-4 rounded-xl">
        <h1 className="px-4 my-2 font-[500]">Reviews</h1>

        {(filteredReviews.length > 0 ? filteredReviews : reviews).map(
          (rev, index) => (
            <UserReview key={index} props={rev} />
          )
        )}
      </div>

      {/* Button */}
      {reviews.length > 0 || myReview ? (
        <div className="mx-4 md:hidden mt-4 mb-12">
          <button
            onClick={writeReview}
            className="bg-color_dark_pink text-white rounded-sm text-xl font-bold h-16 shadow-lg shadow-color_pink w-full"
          >
            Write Review
          </button>
        </div>
      ) : (
        <div className="mx-4 md:hidden mt-96">
          <button
            onClick={writeReview}
            className="bg-color_dark_pink text-white rounded-sm text-xl font-bold h-16 shadow-lg shadow-color_pink w-full"
          >
            Write Review
          </button>
        </div>
      )}

      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
}

export default Reviews;
