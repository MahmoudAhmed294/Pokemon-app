import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";
import PokemonList from "../components/PokemonList"; 
import * as PokemonApi from "../services/pokemonApi";
import type { Pokemon } from "../types/pokemon";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("PokemonList", () => {
  const mockPokemon: Pokemon[] = [
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/", id: 1 },
    { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/", id: 4 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    vi.spyOn(PokemonApi, "useGetPokemonListQuery").mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      refetch: function () {
        throw new Error("Function not implemented.");
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("Loading Pokemon...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    vi.spyOn(PokemonApi, "useGetPokemonListQuery").mockReturnValue({
      data: undefined,
      isLoading: false,
      error: true,
      refetch: function() {
        throw new Error("Function not implemented.");
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("Error loading Pokemon!")).toBeInTheDocument();
  });

  it("renders and filters pokemon list", () => {
    vi.spyOn(PokemonApi, "useGetPokemonListQuery").mockReturnValue({
      data: { results: mockPokemon },
      isLoading: false,
      error: null,
      refetch: function () {
        throw new Error("Function not implemented.");
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  });
});
