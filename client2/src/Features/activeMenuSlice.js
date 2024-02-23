import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeData: ""
};

const activeMenuSlice = createSlice({
  name: "activeMenu",
  initialState,
  reducers: {
    activeMenuSet: (state, action) => {
      state.activeData = action.payload;
    }
  }
});

export const { activeMenuSet } =
    activeMenuSlice.actions;
export default activeMenuSlice.reducer;
