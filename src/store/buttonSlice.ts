import { createSlice } from "@reduxjs/toolkit";

const buttonSlice = createSlice({
  name: "button",
  initialState: false,
  reducers: {
    setButtonClicked: (state) => {
      return !state;
    },
  },
});

export const { setButtonClicked } = buttonSlice.actions;

export default buttonSlice.reducer;
