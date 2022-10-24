import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeType: 0,
  activeSort: {
    name: "Rating",
    sortProperty: "rating",
  },
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setActiveType(state, action) {
      action.payload === state.activeType
        ? (state.activeType = 0)
        : (state.activeType = action.payload);
    },
    setActiveSort: (state, action) => {
      state.activeSort = action.payload;
    },
  },
});

console.log(sortSlice);
// Action creators are generated for each case reducer function
export const { setActiveType, setActiveSort } = sortSlice.actions;

export default sortSlice.reducer;
