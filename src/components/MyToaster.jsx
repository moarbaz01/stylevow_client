import React from "react";
import { Toaster } from "react-hot-toast";

function MyToaster() {
  return (
    <div className=" select-none">
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default MyToaster;
