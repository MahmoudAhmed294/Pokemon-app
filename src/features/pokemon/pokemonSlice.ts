import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from "../../types/pokemon";

interface PokemonState {
  selectedPokemon: Pokemon | null;
  favorites: Pokemon[];
}

const loadFavoritesFromStorage = (): Pokemon[] => {
  try {
    const storedFavorites = localStorage.getItem('pokemonFavorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error('Failed to load favorites from localStorage:', error);
    return [];
  }
};

const saveFavoritesToStorage = (favorites: Pokemon[]) => {
  try {
    localStorage.setItem('pokemonFavorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save favorites to localStorage:', error);
  }
};

const initialState: PokemonState = {
  selectedPokemon: null,
  favorites: loadFavoritesFromStorage(),
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    selectPokemon: (state, action: PayloadAction<Pokemon>) => {
      state.selectedPokemon = action.payload;
    },
    clearSelectedPokemon: (state) => {
      state.selectedPokemon = null;
    },
    toggleFavorite: (state, action: PayloadAction<Pokemon>) => {
      const pokemon = action.payload;
      const existingIndex = state.favorites.findIndex(p => p.id === pokemon.id);
      
      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1);
      } else {
        state.favorites.push(pokemon);
      }
      
      saveFavoritesToStorage(state.favorites);
    },
  },
});

export const { selectPokemon, clearSelectedPokemon, toggleFavorite } = pokemonSlice.actions;
export default pokemonSlice.reducer;