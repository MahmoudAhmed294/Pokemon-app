import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPokemonListQuery } from "../../services/pokemonApi";
import type { Pokemon } from "../../types/pokemon";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { selectPokemon, toggleFavorite } from "../../features/pokemon/pokemonSlice";
import "./PokemonList.css";

const PokemonList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetPokemonListQuery();
  const favorites = useAppSelector((state) => state.pokemon.favorites);
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) return <div className='loading'>Loading Pokemon...</div>;
  if (error) return <div className='error'>Error loading Pokemon!</div>;
  if (!data) return <div className='no-data'>No Pokemon found!</div>;

  const handlePokemonClick = (pokemon: Pokemon) => {
    const id = pokemon.id || pokemon.url?.split("/").filter(Boolean).pop();
    if (id) {
      dispatch(selectPokemon(pokemon));
      navigate(`/pokemon/${id}`);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent, pokemon: Pokemon) => {
    e.stopPropagation();
    dispatch(toggleFavorite(pokemon));
  };

  const isFavorite = (pokemon: Pokemon) => {
    return favorites.some((fav) => fav.id === pokemon.id);
  };

  const pokemonWithIds = data.results.map((pokemon) => {
    if (pokemon.id) return pokemon;
    const id = pokemon.url?.split("/").filter(Boolean).pop();
    return { ...pokemon, id: Number(id) };
  });

  const filteredPokemon = pokemonWithIds.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className='pokemon-list-container'>
      <h1>Pokemon List</h1>

      <div className='search-container'>
        <input
          type='text'
          placeholder='Search Pokemon...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='search-input'
        />
      </div>

      <div className='pokemon-list'>
        {filteredPokemon.map((pokemon) => (
          <div
            key={pokemon.id}
            className='pokemon-item'
            onClick={() => handlePokemonClick(pokemon)}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
              className='pokemon-sprite'
            />
            <span className='pokemon-name'>{pokemon.name}</span>
            <button
              className={`favorite-button ${isFavorite(pokemon) ? "favorited" : ""}`}
              onClick={(e) => handleToggleFavorite(e, pokemon)}
              aria-label={isFavorite(pokemon) ? "Remove from favorites" : "Add to favorites"}>
              {isFavorite(pokemon) ? "★" : "☆"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
