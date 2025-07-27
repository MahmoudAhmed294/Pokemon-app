import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PokemonDetail, PokemonListResponse } from "../types/pokemon";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Pokemon"],
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListResponse, void>({
      query: () => "/pokemon",
      providesTags: ["Pokemon"],
    }),
    getPokemonDetail: builder.query<PokemonDetail, string>({
      query: (id) => `/pokemon/${id}`,
      providesTags: (result, error, id) => [{ type: "Pokemon", id }],
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonDetailQuery } = pokemonApi;
