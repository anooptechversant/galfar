import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subCategoryData: [],
  subCategoryLoading: false,
  subCategorySuccess: null,
  subCategoryError: null,
};

const subCategorySlice = createSlice({
  name: "subcategory",
  initialState,
  reducers: {
    subCategoryReq: (state, action) => {
      state.subCategoryLoading = true;
      state.subCategorySuccess = null;
      state.subCategoryError = null;
    },

    subCategoryFetch: (state, action) => {
      state.subCategoryLoading = false;
      state.subCategoryData = action.payload;
    },
    subCategorySuccess: (state, action) => {
      console.log("hhhhhhhh")
      state.subCategoryLoading = false;
      state.subCategorySuccess = action.payload;
    },
    subCategoryFail: (state, action) => {
      state.subCategoryLoading = false;
      state.subCategorySuccess = null;
      state.subCategoryError = action.payload;
    },
  },
});

export const { subCategoryReq, subCategoryFetch, subCategorySuccess, subCategoryFail } =
  subCategorySlice.actions;
export default subCategorySlice.reducer;
