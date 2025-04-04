import React from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../store/features/cart/cartSlice";
import { useDispatch } from "react-redux";

const Card = ({ products }) => {
  const { title, brand, price, rating, images } = products;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate(`/products/${products._id}`, { state: { products } });
  };
  const handleAddToCart = (products) => {
    dispatch(addToCart(products));
  };
  return (
    <div className=" text-center border border-gray-200 h-fit w-fit shadow-lg rounded-sm cursor-pointer">
      <div onClick={handleClick}>
        <img
          src={images[0].secure_url}
          className=" h-28 w-32 object-cover mb-2 rounded-sm"
        />
        <div>{title.slice(0, 10)}</div>
        <div>{brand}</div>
        <div className=" flex justify-evenly gap-2 px-2 py-2">
          <span>$ {price}</span>
          <span>{rating}</span>
        </div>
      </div>
      <button onClick={()=>handleAddToCart(products)} className=" p-2 bg-blue-400 text-white w-full font-semibold rounded-b-sm cursor-pointer">
        Add To Cart
      </button>
    </div>
  );
};

export default Card;
