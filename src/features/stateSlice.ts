import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
};

export const stateSlice = createSlice({
  name: "theState",
  initialState,
  reducers: {
    theUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { theUsername } = stateSlice.actions;
export default stateSlice.reducer;
