import React from "react";
import { useLocation } from "react-router-dom";

const ProductDetails = () => {
  const location = useLocation();
  const state = location.state?.products;
  return (
    <div>
      <h2 className="text-center py-3">Product Details</h2>
      <div className="flex flex-col items-center justify-center">
        <img
          src={state?.images[0].secure_url}
          alt=""
          className="w-[300px] h-[300px] object-cover mb-3"
        />
        <h2>{state?.title}</h2>
        <p>{state?.description}</p>
        <div className="flex gap-4 my-3">
          <span>$ {state?.price}</span>
          <span>{state?.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
