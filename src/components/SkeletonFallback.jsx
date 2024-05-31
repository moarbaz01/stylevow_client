import React from "react";

const SkeletonFallback = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Skeleton for a loading card */}
      <div className="flex gap-4">
        <div className="w-24 h-24 bg-gray-300 rounded"></div>
        <div className="flex flex-col justify-between">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-12 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Skeleton for a loading list */}
      <div className="space-y-2">
        <div className="h-8 bg-gray-300 rounded"></div>
        <div className="h-8 bg-gray-300 rounded"></div>
        <div className="h-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonFallback;
