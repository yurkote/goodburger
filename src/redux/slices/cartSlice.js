import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartTest: (state, { payload }) => {
      const findItem = state.items.find((obj) => obj.id === payload.id);
      if (findItem) {
        const findIt = findItem.addons.map(el => el.title);
        const payloadArr = payload.addons.map(el => el.title);
        if(findIt.every((el) => payloadArr.includes(el) && findIt.length === payloadArr.length)) {
          findItem.count++;
        }
      } else {
        state.items.push({
          ...payload,
          count: 1,
        });
      }
    },
    addToCart: (state, { payload }) => {
      const findItem = state.items.find((obj) => obj.id === payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce(
        (sum, obj) => sum + obj.price * obj.count,
        0
      );
    },
    minusItem: (state, { payload }) => {
      const findItem = state.items.find((obj) => obj.id === payload.id);
      findItem.count--;
      state.totalPrice -= findItem.price;
    },
    removeItem(state, { payload }) {
      console.log(payload);
      console.log(state.items);
      state.items = state.items.filter((obj) => obj.id !== payload);
      state.totalPrice = state.items.reduce(
        (sum, obj) => sum + obj.price * obj.count,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeItem, clearCart, minusItem, addToCartTest } =
  cartSlice.actions;

export default cartSlice.reducer;
