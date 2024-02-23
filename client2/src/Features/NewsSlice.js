import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newsData: [],
  newsLoading: false,
  newsSuccess: null,
  newsError: null,
};
const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    newsReq: (state, action) => {
      state.newsLoading = true;
      state.newsSuccess = null;
      state.newsError = null;
    },

    newsFetch: (state, action) => {
      state.newsLoading = false;
      state.newsData = action.payload;
    },
    newsSuccess: (state, action) => {
      state.newsLoading = false;
      state.newsSuccess = action.payload;
    },
    newsFail: (state, action) => {
      state.newsLoading = false;
      state.newsSuccess = null;
      state.newsError = action.payload;
    },
  },
});

export const { newsReq, newsFetch, newsSuccess, newsFail } =
  newsSlice.actions;
export default newsSlice.reducer;
