import React from "react";
import ProductCard from "./ProductCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCardSkeleton from "./ProductCardSkeleton";

function Products({ data = [], limit = 8 }) {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-6 gap-y-4 mx-2 md:gap-y-12">
      {data.length > 0
        ? data
            .slice(0, limit)
            .map((product, index) => (
              <ProductCard key={index} props={product} />
            ))
        : Array.from({ length: limit }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
    </div>
  );
}

export default Products;
