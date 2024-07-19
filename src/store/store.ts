import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import ballReducer from "./ballSlice";
import buttonReducer from "./buttonSlice";
import { api } from "@/services/api";
import { pokemonApi } from "@/services/pokemonApi";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    ball: ballReducer,
    button: buttonReducer,
    [api.reducerPath]: api.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  // @ts-ignore
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
