import React, { useEffect } from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import { product } from "../data";
import ProductView from "../components/ProductView";
import Footer from "../components/Footer";

function Product() {
  const buttonRef = React.useRef();
  useEffect(() => {
    buttonRef.current?.scrollIntoView();
  }, [product]);
  return (
    <div>
      <div ref={buttonRef} className=" hidden md:block">
        <Announcement />
      </div>
      <div className=" hidden md:block">
        <Navbar />
      </div>

      {/* Product Content  */}
      <div className="md:mt-12">
        <ProductView />
      </div>

      {/* Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
}

export default Product;
