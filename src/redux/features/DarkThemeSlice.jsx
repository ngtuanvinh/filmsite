import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggle(state) {
      state.status = !state.status;
    },
  },
});

export const { toggle } = darkModeSlice.actions;

export const selectDarkTheme = (state) => state.darkMode.status;

export default darkModeSlice.reducer;
