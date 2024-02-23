import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryData: [],
  categoryLoading: false,
  categorySuccess: null,
  categoryError: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    categoryReq: (state, action) => {
      state.categoryLoading = true;
      state.categorySuccess = null;
      state.categoryError = null;
    },

    categoryFetch: (state, action) => {
      state.categoryLoading = false;
      state.categoryData = action.payload;
    },
    categorySuccess: (state, action) => {
      state.categoryLoading = false;
      state.categorySuccess = action.payload;
    },
    categoryFail: (state, action) => {
      state.categoryLoading = false;
      state.categorySuccess = null;
      state.categoryError = action.payload;
    },
  },
});

export const { categoryReq, categoryFetch, categorySuccess, categoryFail } =
  categorySlice.actions;
export default categorySlice.reducer;
