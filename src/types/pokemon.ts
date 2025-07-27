export interface Pokemon {
  id: number;
  name: string;
  url?: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  sprites: {
    front_default: string;
    other?: {
      'official-artwork'?: {
        front_default?: string;
      };
    };
  };
  stats: PokemonStat[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}