import React from "react";
import Skeleton from "react-loading-skeleton";

const ProductViewSkeleton = () => {
  return (
    <div>
      {/* Product top */}
      <div className="md:h-12 md:hidden h-16 px-6 my-2 tracking-wide w-full flex items-center justify-between md:justify-center md:text-sm bg-white">
        <Skeleton width={100} height={40} />
        <Skeleton width={140} height={40} />
      </div>

      <div className="flex flex-col md:w-[80%] md:mx-auto shadow-sm pb-6 justify-between md:mb-24 lg:flex-row gap-4 lg:items-start bg-white">
        {/* Product Image Skeleton */}
        <div className="flex flex-col w-full justify-center gap-6 md:mt-0 mt-4 lg:w-2/4">
          <div className="p-2 w-full mx-auto flex items-center justify-center my-auto">
            <Skeleton height={420} width={420} />
          </div>
          <div className="flex items-center px-2 md:px-0 md:justify-center w-full overflow-x-scroll gap-2 ">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} height={100} width={100} />
            ))}
          </div>
        </div>
        {/* Product Details Skeleton */}
        <div className="flex flex-col  mt-0 w-[90%] md:pl-0 pl-6 gap-4 lg:w-2/4">
          <div>
            <Skeleton width={100} height={20} />
            <Skeleton width={200} height={40} />
          </div>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} circle={true} height={20} width={20} />
            ))}
          </div>
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton width={100} height={24} />
          <Skeleton width={100} height={20} />
          <Skeleton height={64} />
        </div>
      </div>

      {/* Phone Additional Details */}
      <div className="w-full px-6 md:w-[80%] bg-pink-50 items-center md:mx-auto">
        <Skeleton height={40} width={200} />
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} height={120} />
        ))}
      </div>

      {/* Product Bottom */}
      <div className="max-w-[1080px] mx-auto">
        <div className="md:my-16 my-2 mb-28">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} height={280} width="100%" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductViewSkeleton;
