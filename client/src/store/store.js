import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import cartReducer from "./features/cart/cartSlice";
import filtersReducer from "./features/products/filterSlice";
import { productApi } from "./features/products/productApi";
import authReducer from "./features/auth/authSlice";
import { authApi } from "./features/auth/authApi";
export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    cart: cartReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    // Add the generated productApi reducer
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Disable serializable check in dev mode
    })
      .concat(productApi.middleware)
      .concat(authApi.middleware),
});

// Setup API cache listeners
setupListeners(store.dispatch);
