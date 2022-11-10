import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../helpers/calcTotalPrice";
import { getCartFromLS } from "../../helpers/getCartFromLS";
import { ProductItem } from "../../pages/Product/Product";

type AddOn = {
  title: string;
  weightAddon: number;
  priceAddon: number;
};

export type CartItem = {
  id: string;
  title: string;
  addons: AddOn[];
  imageUrl: string;
  count: number;
  price: number;
  cartIndex: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
  cartIndex: number;
}

const { items, totalPrice, cartIndex } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
  cartIndex,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<ProductItem>) => {
      const id = payload.id;
      const length = payload.addons.length;
      const titles = payload.addons.map((_: AddOn) => _.title);

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

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem: (state, { payload }: PayloadAction<number>) => {
      const item = state.items.find((obj) => obj.cartIndex === payload);
      if (item) {
        item.count--;
        state.totalPrice -= item.price;
      }
    },
    removeItem(state, { payload }: PayloadAction<number>) {
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
