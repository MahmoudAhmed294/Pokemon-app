import { useParams } from "react-router-dom";
import { useGetPokemonDetailQuery } from "../../services/pokemonApi";
import "./PokemonDetail.css";

const PokemonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data,
    error,
    isFetching: isLoading,
  } = useGetPokemonDetailQuery(id || "", {
    refetchOnMountOrArgChange: true,
    skip: !id,
  });

  if (isLoading) return <div className='loading'>Loading Pokemon...</div>;
  if (error) return <div className='error'>Error loading Pokemon details!</div>;
  if (!data) return <div className='no-data'>No Pokemon found!</div>;

  const pokemonImage =
    data.sprites.other?.["official-artwork"]?.front_default || data.sprites.front_default;

  return (
    <div className='pokemon-detail'>
      <div className='header'>
        <h1>{data.name}</h1>
      </div>

      <div className='image-container'>
        <img src={pokemonImage} alt={data.name} className='pokemon-image' loading='lazy' />
      </div>

      <table className='pokemon-info-table'>
        <tbody>
          <tr>
            <th>Name:</th>
            <td>{data.name}</td>
          </tr>
          <tr>
            <th data-testid='pokemon-height'>Height:</th>
            <td>{data.height / 10} m</td>
          </tr>
          <tr>
            <th>Weight:</th>
            <td>{data.weight / 10} kg</td>
          </tr>
          <tr>
            <th data-testid='pokemon-types'>Types:</th>
            <td>{data.types.map((t) => t.type.name).join(", ")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PokemonDetail;
