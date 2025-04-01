import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useGetProductsQuery } from "../../store/features/products/productApi";

const Products = () => {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();
  const noProductsFound = products?.product?.length === 0;

  return (
    <>
      <h2 className=" my-3">Products</h2>
      <div className=" flex flex-row gap-6">
        <div className="hidden lg:block w-[20%] h-screen border border-gray-200">
          <h2 className=" text-center py-3">Categories</h2>
        </div>
        <div className=" w-[75%] flex flex-wrap gap-3 lg:gap-5">
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error: {error.message}</div>
          ) : noProductsFound ? (
            <div>No products found.</div>
          ) : products?.product?.length > 0 ? (
            products?.product?.map((product) => (
              <Card key={product._id} products={product} />
            ))
          ) : (
            <div>No products available.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
