import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { dataUrl } from "../../helpers/linkData";
import { ProductItem } from "../../pages/Product/Product";

interface ProductState {
  cards: ProductItem[];
  status: "loading" | "success" | "error";
}

type ProductItemParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  activePage: number
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
export const fetchProducts = createAsyncThunk<
  ProductItem[],
  ProductItemParams
>("products/fetchProductsStatus", async (params) => {
  const { sortBy, order, category, search, activePage } = params;
  const { data } = await axios.get<ProductItem[]>(
    `${dataUrl}?p=${activePage}&l=6&${category}&sortBy=${sortBy}&order=${order}${search}`
  );
  return data;
});

const initialState: ProductState = {
  cards: [],
  status: Status.LOADING,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCards: (state, { payload }: PayloadAction<ProductItem[]>) => {
      state.cards = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = Status.LOADING;
      state.cards = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.cards = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = Status.ERROR;
      state.cards = [];
    });
  },
});

// Action creators are generated for each case reducer function
export const { setCards } = productsSlice.actions;

export default productsSlice.reducer;
