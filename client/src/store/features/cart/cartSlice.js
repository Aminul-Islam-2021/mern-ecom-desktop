import { createSlice } from "@reduxjs/toolkit";

const calculateTotal = (cartItems) => {
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return { totalQuantity, totalPrice };
};

// Load cart from localStorage if available
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const initialState = {
  cartItems: loadCartFromStorage(),
  totalQuantity: 0,
  totalPrice: 0,
};

// Calculate totals on initial load
const initialTotals = calculateTotal(initialState.cartItems);
initialState.totalQuantity = initialTotals.totalQuantity;
initialState.totalPrice = initialTotals.totalPrice;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((i) => i._id === item._id);
      if (existItem) {
        existItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: item.quantity || 1 });
      }
      // Update totals and save to localStorage
      const { totalQuantity, totalPrice } = calculateTotal(state.cartItems);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload);
      if (item) {
        item.quantity += 1;
        const { totalQuantity, totalPrice } = calculateTotal(state.cartItems);
        state.totalQuantity = totalQuantity;
        state.totalPrice = totalPrice;
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item) {
        state.cartItems = state.cartItems.filter((i) => i._id !== item._id);
      }
      // Update totals and save to localStorage
      const { totalQuantity, totalPrice } = calculateTotal(state.cartItems);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      // Update totals and save to localStorage
      const { totalQuantity, totalPrice } = calculateTotal(state.cartItems);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cart");
    },
  },
});
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;