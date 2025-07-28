import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import "./PokemonList.css";
import { useGetPokemonListQuery } from "../../services/pokemonApi";
import type { Pokemon } from "../../types/pokemon";

const GIF_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown";

const PokemonList: React.FC = () => {
  const { data, error, isLoading } = useGetPokemonListQuery();
  const navigate = useNavigate();

  if (isLoading) return <p className='loading'>Loading Pokemon...</p>;
  if (error) return <p className='error'>Error loading Pokemon!</p>;

  function extractIdFromUrl(url: string): string | null {
    const parts = url.split("/").filter(Boolean);
    const id = parts.at(-1);
    return id ?? null;
  }

  return (
    <div className='layout-container'>
      <aside className='sidebar'>
        <h2>PokeReact</h2>
        <ul className='sidebar-list'>
          {data?.results.map((p: Pokemon) => {
            const id = extractIdFromUrl(p?.url);

            return (
              <li key={p.name} onClick={() => navigate(`/pokemon/${p.name}`)}>
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
