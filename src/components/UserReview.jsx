import React from "react";
import useRating from "../hooks/useRating";

function UserReview({ props }) {
  const rate = useRating(props.rating);

  return (
    props && (
      <div className=" py-4 px-2 bg-white w-full">
        <div className="flex items-center gap-2">
          <img
            className="h-16 w-16 rounded-full"
            src={props.user?.profileImage}
            alt=""
          />
          <div>
            <span className=" text-lg font-[500]">
              {props.user?.fname + " " + props.user?.lname}
            </span>
            <div className="flex items-center">
              {rate.map((e, index) => {
                // Generate a unique key for each star icon
                const key = `star-${index}`;
                return <React.Fragment key={key}>{e}</React.Fragment>;
              })}
            </div>
          </div>
        </div>
        <p className=" text-start opacity-80 text-gray-500 mt-4">
          {props.review}
        </p>

        {/* Review Images */}
        <div className="flex items-center mt-6 overflow-scroll">
          {props.images?.map((e, index) => {
            return (
              <img
                key={index}
                className="h-24 w-24 rounded-md shadow-sm mx-2 object-cover"
                src={e.url}
                alt=""
              />
            );
          })}
        </div>

        <div className="mt-6 text-xs ">
          <span>
            {props.createdAt &&
              new Date(props.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
          </span>
        </div>
      </div>
    )
  );
}

export default UserReview;
