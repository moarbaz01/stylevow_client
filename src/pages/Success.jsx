import React, { useEffect } from "react";
import Product404 from "../components/Product404";

function Success() {
  // Change back navigation
  useEffect(() => {
    window.history.pushState(null, "", window.location.pathname);
    window.onpopstate = function (event) {
      window.history.pushState(null, "", window.location.pathname);
    };
    return () => {
      window.onpopstate = null;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen items-center justify-center flex">
      <Product404
        props={{
          symbol: "✔",
          title: "Success",
          para: "Thank you for shopping using StyleVow",
          navigate: "Back To Order",
          redirect: "/order",
        }}
      />
    </div>
  );
}

export default Success;
