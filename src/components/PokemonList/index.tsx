import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import "./PokemonList.css";
import { useGetPokemonListQuery } from "../../services/pokemonApi";

const GIF_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown";

const PokemonList: React.FC = () => {
  const { data, error, isLoading } = useGetPokemonListQuery();
  const navigate = useNavigate();

  if (isLoading) return <p className='loading'>Loading Pokemon...</p>;
  if (error) return <p className='error'>Error loading Pokemon!</p>;

  return (
    <div className='layout-container'>
      <aside className='sidebar'>
        <h2>PokeReact</h2>
        <ul className='sidebar-list'>
          {data?.results.map((p: any) => {
            const id = p.url.split("/")[6];
            return (
              <li key={p.name} onClick={() => navigate(`/pokemon/${id}`)}>
                <img src={`${GIF_URL}/${id}.gif`} alt={p.name} />
                <span>{p.name}</span>
              </li>
            );
          })}
        </ul>
      </aside>
      <main className='main-panel'>
        <Outlet />
      </main>
    </div>
  );
};

export default PokemonList;
