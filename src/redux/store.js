import { configureStore } from "@reduxjs/toolkit";
import sort from "./slices/sortSlice";
import cart from "./slices/cartSlice";
import products from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    sort,
    cart,
    products,
  },
});
