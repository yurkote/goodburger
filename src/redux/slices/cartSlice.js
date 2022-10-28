import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
  cartIndex: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const id = payload.id;
      const length = payload.addons.length;
      const titles = payload.addons.map((_) => _.title);

      const findItem = state.items.find(
        (obj) =>
          obj.id === id &&
          obj.addons.length === length &&
          obj.addons.map((el) => el.title).every((el) => titles.includes(el))
      );

      !findItem && state.cartIndex++;
      findItem
        ? findItem.count++
        : state.items.push({
            ...payload,
            count: 1,
            cartIndex: state.cartIndex,
          });

      state.totalPrice = state.items.reduce(
        (sum, obj) => sum + obj.price * obj.count,
        0
      );
    },
    minusItem: (state, { payload }) => {
      const item = state.items.find((obj) => obj.cartIndex === payload);
      item.count--;
      state.totalPrice -= item.price;
    },
    removeItem(state, { payload }) {
      state.items = state.items.filter((obj) => obj.cartIndex !== payload);
      state.cartIndex--;
      state.totalPrice = state.items.reduce(
        (sum, obj) => sum + obj.price * obj.count,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.cartIndex = 0;
    },
  },
});

export const { addToCart, removeItem, clearCart, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
