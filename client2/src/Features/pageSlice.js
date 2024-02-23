import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageData: [],
  pageLoading: false,
  pageSuccess: null,
  pageError: null,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    pageReq: (state, action) => {
      state.pageLoading = true;
      state.pageSuccess = null;
      state.pageError = null;
    },

    pageFetch: (state, action) => {
      state.pageLoading = false;
      state.pageData = action.payload;
    },
    pageSuccess: (state, action) => {
      state.pageLoading = false;
      state.pageSuccess = action.payload;
    },
    pageFail: (state, action) => {
      state.pageLoading = false;
      state.pageSuccess = null;
      state.pageError = action.payload;
    },
  },
});

export const { pageReq, pageFetch, pageSuccess, pageFail } =
  pageSlice.actions;
export default pageSlice.reducer;
