import React from "react";
import { useLocation } from "react-router-dom";
import { useGetProductsQuery } from "../../store/features/products/productApi";
import Card from "../components/Card";

const SearchResult = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get("keyword");
  const { data, isLoading } = useGetProductsQuery(keyword ? { keyword } : {});
  return (
    <div>
      <h2>Search Results for "{keyword}"</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className=" w-[75%] flex flex-wrap gap-3 lg:gap-5">
          {data?.product?.map((product) => (
            <Card key={product._id} products={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
