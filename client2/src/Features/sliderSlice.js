import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sliderData: [],
  sliderLoading: false,
  sliderSuccess: null,
  sliderError: null,
};
const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    sliderReq: (state, action) => {
      state.sliderLoading = true;
      state.sliderSuccess = null;
      state.sliderError = null;
    },

    sliderFetch: (state, action) => {
      state.sliderLoading = false;
      state.sliderData = action.payload;
    },
    sliderSuccess: (state, action) => {
      state.sliderLoading = false;
      state.sliderSuccess = action.payload;
    },
    sliderFail: (state, action) => {
      state.sliderLoading = false;
      state.sliderSuccess = null;
      state.sliderError = action.payload;
    },
  },
});

export const { sliderReq, sliderFetch, sliderSuccess, sliderFail } =
  sliderSlice.actions;
export default sliderSlice.reducer;
