// Raw API response from GET /pokemon?limit=20&offset=0
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

// Raw API response from GET /pokemon/{name}
export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other: {
      'official-artwork': {
        front_default: string | null;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
}

// Normalized card data for the grid
export interface PokemonCardData {
  id: number;
  name: string;
  image: string;
  types: string[];
  hp: number;
  attack: number;
  speed: number;
}

// Raw API response from GET /type/{type}
export interface TypeListResponse {
  id: number;
  name: string;
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }[];
}

// For the type filter dropdown
export interface PokemonTypeOption {
  name: string;
  url: string;
}

// Sort options
export type SortOption = 'id' | 'name' | 'attack' | 'speed' | 'hp';

// Raw API response from GET /pokemon-species/{name}
export interface PokemonSpecies {
  evolution_chain: {
    url: string;
  };
}

// Raw API response from evolution chain URL
export interface EvolutionChainResponse {
  id: number;
  chain: EvolutionChainLink;
}

export interface EvolutionChainLink {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChainLink[];
}
