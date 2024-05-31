import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // import CSS if you haven't already

const ProductCardSkeleton = () => {
  return (
    <div className="cursor-pointer">
      <div className="flex flex-col rounded-sm shadow-md py-2 px-2 border-[1px]">
        <div className="p-2 hidden md:block mx-auto">
          <Skeleton height={260} width={220} borderRadius={10} />
        </div>
        <div className="p-2 md:hidden mx-auto">
          <Skeleton height={120} width={120} borderRadius={10} />
        </div>
        <div className="flex flex-col p-2">
          <Skeleton width={100} height={14} />
          <Skeleton width={100} height={20} />
          <div className="flex items-center mt-1 gap-1">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} circle={true} height={20} width={20} />
            ))}
          </div>
          <div className="flex items-center mt-1 gap-6">
            <Skeleton width={50} height={24} />
            <Skeleton width={50} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
