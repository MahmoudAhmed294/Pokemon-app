import { useParams, useNavigate } from "react-router-dom";
import { useGetPokemonDetailQuery } from "../../services/pokemonApi";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { toggleFavorite } from "../../features/pokemon/pokemonSlice";
import type { Pokemon } from "../../types/pokemon";
import "./PokemonDetail.css";

const PokemonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetPokemonDetailQuery(id || "");
  const favorites = useAppSelector((state) => state.pokemon.favorites);

  if (isLoading) return <div className='loading'>Loading Pokemon details...</div>;
  if (error) return <div className='error'>Error loading Pokemon details!</div>;
  if (!data) return <div className='no-data'>No Pokemon found!</div>;

  const handleGoBack = () => {
    navigate(-1);
  };

  const isFavorite = () => {
    return favorites.some((fav) => fav.id === data.id);
  };

  const handleToggleFavorite = () => {
    const pokemon: Pokemon = {
      id: data.id,
      name: data.name,
    };
    dispatch(toggleFavorite(pokemon));
  };

  const pokemonImage =
    data.sprites.other?.["official-artwork"]?.front_default || data.sprites.front_default;

  return (
    <div className='pokemon-detail-container'>
      <button className='back-button' onClick={handleGoBack}>
        &larr; Back to List
      </button>

      <div className='pokemon-detail-card'>
        <div className='pokemon-detail-header'>
          <h1>{data.name}</h1>
          <span className='pokemon-id'>#{data.id}</span>
          <button
            className={`favorite-button ${isFavorite() ? "favorited" : ""}`}
            onClick={handleToggleFavorite}
            aria-label={isFavorite() ? "Remove from favorites" : "Add to favorites"}>
            {isFavorite() ? "★" : "☆"}
          </button>
        </div>

        <div className='pokemon-detail-content'>
          <div className='pokemon-image-container'>
            <img src={pokemonImage} alt={data.name} className='pokemon-image' />
          </div>

          <div className='pokemon-info'>
            <div className='info-section'>
              <h2>Base Info</h2>
              <div className='info-grid'>
                <div className='info-item'>
                  <span className='info-label'>Height</span>
                  <span className='info-value'>{data.height / 10} m</span>
                </div>
                <div className='info-item'>
                  <span className='info-label'>Weight</span>
                  <span className='info-value'>{data.weight / 10} kg</span>
                </div>
              </div>
            </div>

            <div className='info-section'>
              <h2>Types</h2>
              <div className='types-container'>
                {data.types.map((typeInfo) => (
                  <span key={typeInfo.type.name} className={`type-badge ${typeInfo.type.name}`}>
                    {typeInfo.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className='info-section'>
              <h2>Abilities</h2>
              <div className='abilities-container'>
                {data.abilities.map((abilityInfo, index) => (
                  <span key={index} className='ability-badge'>
                    {abilityInfo.ability.name}
                  </span>
                ))}
              </div>
            </div>

            <div className='info-section'>
              <h2>Stats</h2>
              <div className='stats-container'>
                {data.stats.map((statInfo) => (
                  <div key={statInfo.stat.name} className='stat-item'>
                    <span className='stat-label'>{statInfo.stat.name}</span>
                    <div className='stat-bar-container'>
                      <div
                        className='stat-bar'
                        style={{
                          width: `${Math.min(100, (statInfo.base_stat / 255) * 100)}%`,
                        }}></div>
                    </div>
                    <span className='stat-value'>{statInfo.base_stat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
