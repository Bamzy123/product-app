import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice.jsx";
import cartReducer from "./cartSlice.jsx";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;