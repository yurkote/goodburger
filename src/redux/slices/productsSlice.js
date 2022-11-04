import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { dataUrl } from "../../helpers/linkData";

export const fetchProducts = createAsyncThunk(
  "products/fetchProductsStatus",
  async (params) => {
    const { sortBy, order, category, search, activePage } = params;
    const { data } = await axios(
      `${dataUrl}?p=${activePage}&l=6&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);

const initialState = {
  cards: [],
  status: "loading",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCards: (state, { payload }) => {
      state.cards = payload;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = "loading";
      state.cards = [];
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.cards = action.payload;
      state.status = "success";
    },
    [fetchProducts.rejected]: (state) => {
      state.status = "error";
      state.cards = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCards } = productsSlice.actions;

export default productsSlice.reducer;
