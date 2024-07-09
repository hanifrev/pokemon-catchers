import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  poke: 0,
  great: 0,
  master: 0,
  coins: 0,
  catch: 0,
  attempt: 0,
  pokemon: [],
};

const ballSlice = createSlice({
  name: "ball",
  initialState: initialState,
  reducers: {
    pokeCount: (state, action) => {
      state.poke = action.payload;
    },
    greatCount: (state, action) => {
      state.great = action.payload;
    },
    masterCount: (state, action) => {
      state.master = action.payload;
    },
    coinsCount: (state, action) => {
      state.coins = action.payload;
    },
    catchCount: (state, action) => {
      state.catch = action.payload;
    },
    attemptCount: (state, action) => {
      state.attempt = action.payload;
    },
    pokemonList: (state, action) => {
      state.pokemon = action.payload;
    },
  },
});

export const {
  pokeCount,
  greatCount,
  masterCount,
  coinsCount,
  catchCount,
  attemptCount,
  pokemonList,
} = ballSlice.actions;
export default ballSlice.reducer;
