import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2" }),
  reducerPath: "pokemonApi",
  tagTypes: ["theapi"],
  endpoints: (builder) => ({
    getPokemonById: builder.query<any, number>({
      query: (id) => `/pokemon/${id}`,
      providesTags: ["theapi"],
    }),
  }),
});

export const { useGetPokemonByIdQuery } = pokemonApi;
