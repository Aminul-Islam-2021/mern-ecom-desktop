import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, decrementQuantity, incrementQuantity, removeFromCart } from "../../store/features/cart/cartSlice";

const CartPage = () => {
  const { cartItems, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();
  
  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between mb-4 border-b pb-4"
              >
                <div>
                  <h2 className="text-xl">{item.title}</h2>
                  <p>Price: ${item.price}</p>
                  <p>Total: ${item.price * item.quantity}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => dispatch(decrementQuantity(item._id))}
                    className="px-3 py-1 bg-gray-300"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(incrementQuantity(item._id))}
                    className="px-3 py-1 bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="bg-red-500 text-white px-3 py-1"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-4">
              <p>Total Quantity:{totalQuantity} </p>
              <p>Total Price:${totalPrice.toFixed(2)} </p>
              <button
                onClick={() => dispatch(clearCart())}
                className="mt-4 bg-red-500 text-white px-4 py-2"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
