import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  username: string;
  email: string;
  coins: number;
  pokeBall: number;
  greatBall: number;
  masterBall: number;
  catched: number;
  attempt: number;
  myPokemon: {
    uid: string;
    id: number;
    name: string;
    nickname: string;
    sprite: string;
    dateCaught: string;
  }[];
  accessToken: string;
}

interface UserState {
  data: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setData, setLoading, setError } = dataSlice.actions;

export default dataSlice.reducer;
