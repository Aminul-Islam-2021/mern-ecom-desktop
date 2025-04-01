import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import cartReducer from "./features/cart/cartSlice";
import filtersReducer from "./features/products/filterSlice";
import { productApi } from "./features/products/productApi";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    cart: cartReducer,
    // Add the generated productApi reducer
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Disable serializable check in dev mode
    }).concat(productApi.middleware),
});

// Setup API cache listeners
setupListeners(store.dispatch);
