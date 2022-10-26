import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeType: 0,
  activePage: 1,
  activeSort: {
    name: "Rating",
    sortProperty: "rating",
  },
  inputValue: "",
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setActiveType(state, action) {
      state.inputValue = "";
      action.payload === state.activeType
        ? (state.activeType = 0)
        : (state.activeType = action.payload);
    },
    setActiveSort: (state, action) => {
      state.activeSort = action.payload;
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    setParamsToState: (state, action) => {
      state.activeType = +action.payload.activeType;
      state.activePage = +action.payload.activePage;
      state.activeSort = action.payload.sort;
      state.inputValue = action.payload.inputValue;
    },
    setSearchValue: (state, action) => {
      state.activePage = 1;
      state.inputValue = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setActiveType,
  setActiveSort,
  setActivePage,
  setParamsToState,
  setSearchValue,
} = sortSlice.actions;

export default sortSlice.reducer;
