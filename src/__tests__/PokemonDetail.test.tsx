import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";
import * as PokemonApi from "../services/pokemonApi";
import PokemonDetail from "../components//PokemonDetail";

// Mocks
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useParams: () => ({ id: "1" }),
    useNavigate: () => vi.fn(),
  };
});

// Mock AppSelector & Dispatch
vi.mock("../utils/hooks", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../utils/hooks")>();
  return {
    ...actual,
    useAppSelector: vi.fn(() => []),
    useAppDispatch: () => vi.fn(),
  };
});

describe("PokemonDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockPokemon = {
    id: 1,
    name: "bulbasaur",
    height: 7,
    weight: 69,
    sprites: {
      front_default: "front.png",
      other: {
        "official-artwork": {
          front_default: "official.png",
        },
      },
    },
    types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
    abilities: [{ ability: { name: "overgrow" } }, { ability: { name: "chlorophyll" } }],
    stats: [
      { stat: { name: "hp" }, base_stat: 45 },
      { stat: { name: "attack" }, base_stat: 49 },
    ],
  };

  it("shows loading state", () => {
    vi.spyOn(PokemonApi, "useGetPokemonDetailQuery").mockReturnValue({
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
          <PokemonDetail />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("Loading Pokemon details...")).toBeInTheDocument();
  });

  it("shows error state", () => {
    vi.spyOn(PokemonApi, "useGetPokemonDetailQuery").mockReturnValue({
      data: undefined,
      isLoading: false,
      error: true,
      refetch: function () {
        throw new Error("Function not implemented.");
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonDetail />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("Error loading Pokemon details!")).toBeInTheDocument();
  });

  it("shows no data message", () => {
    vi.spyOn(PokemonApi, "useGetPokemonDetailQuery").mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      refetch: function () {
        throw new Error("Function not implemented.");
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonDetail />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("No Pokemon found!")).toBeInTheDocument();
  });

  it("renders pokemon details", () => {
    vi.spyOn(PokemonApi, "useGetPokemonDetailQuery").mockReturnValue({
      data: mockPokemon,
      isLoading: false,
      error: null,
      refetch: function () {
        throw new Error("Function not implemented.");
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonDetail />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("#1")).toBeInTheDocument();
    expect(screen.getByText("Height")).toBeInTheDocument();
    expect(screen.getByText("6.9 kg")).toBeInTheDocument(); // weight
    expect(screen.getByText("grass")).toBeInTheDocument();
    expect(screen.getByText("overgrow")).toBeInTheDocument();
    expect(screen.getByText("hp")).toBeInTheDocument();
  });
});
