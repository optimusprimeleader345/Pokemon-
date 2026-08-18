import {
  PokemonListResponse,
  PokemonDetail,
  PokemonCardData,
  TypeListResponse,
  PokemonTypeOption,
  PokemonSpecies,
  EvolutionChainResponse,
} from '@/types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

function normalizeCardData(detail: PokemonDetail): PokemonCardData {
  const getStat = (name: string) =>
    detail.stats.find((s) => s.stat.name === name)?.base_stat ?? 0;

  return {
    id: detail.id,
    name: detail.name,
    image:
      detail.sprites.other['official-artwork'].front_default ??
      detail.sprites.front_default ??
      '',
    types: detail.types.map((t) => t.type.name),
    hp: getStat('hp'),
    attack: getStat('attack'),
    speed: getStat('speed'),
  };
}

export async function getPokemonList(
  limit = 20,
  offset = 0
): Promise<{ pokemon: PokemonCardData[]; total: number }> {
  try {
    const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    if (!res.ok) throw new ApiError('Failed to fetch Pokémon list', res.status);
    const data: PokemonListResponse = await res.json();

    const details = await Promise.all(
      data.results.map(async (p) => {
        const detailRes = await fetch(p.url);
        if (!detailRes.ok) throw new ApiError(`Failed to fetch ${p.name}`);
        const detail: PokemonDetail = await detailRes.json();
        return normalizeCardData(detail);
      })
    );

    return { pokemon: details, total: data.count };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Something went wrong while fetching Pokémon. Please try again.');
  }
}

export async function getPokemonByName(name: string): Promise<PokemonCardData | null> {
  try {
    const res = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase().trim()}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new ApiError('Failed to fetch Pokémon', res.status);
    const detail: PokemonDetail = await res.json();
    return normalizeCardData(detail);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Something went wrong while searching. Please try again.');
  }
}

export async function getPokemonDetail(name: string): Promise<PokemonDetail> {
  try {
    const res = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase().trim()}`);
    if (res.status === 404) throw new ApiError('Pokémon not found', 404);
    if (!res.ok) throw new ApiError('Failed to fetch Pokémon details', res.status);
    return await res.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Something went wrong. Please try again.');
  }
}

export async function getPokemonByType(type: string): Promise<PokemonCardData[]> {
  try {
    const res = await fetch(`${BASE_URL}/type/${type.toLowerCase().trim()}`);
    if (!res.ok) throw new ApiError('Failed to fetch type data', res.status);
    const data: TypeListResponse = await res.json();

    // Limit to first 40 to avoid too many requests
    const subset = data.pokemon.slice(0, 40);

    const details = await Promise.all(
      subset.map(async (p) => {
        const detailRes = await fetch(p.pokemon.url);
        if (!detailRes.ok) throw new ApiError(`Failed to fetch ${p.pokemon.name}`);
        const detail: PokemonDetail = await detailRes.json();
        return normalizeCardData(detail);
      })
    );

    return details;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Something went wrong while filtering. Please try again.');
  }
}

export async function getAllTypes(): Promise<PokemonTypeOption[]> {
  try {
    const res = await fetch(`${BASE_URL}/type`);
    if (!res.ok) throw new ApiError('Failed to fetch types', res.status);
    const data = await res.json();
    // Filter out 'unknown' and 'shadow' types as they are not real types
    return (data.results as PokemonTypeOption[]).filter(
      (t) => !['unknown', 'shadow', 'stellar'].includes(t.name)
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Something went wrong while loading types.');
  }
}

export async function getPokemonSpecies(name: string): Promise<PokemonSpecies> {
  try {
    const res = await fetch(`${BASE_URL}/pokemon-species/${name.toLowerCase().trim()}`);
    if (res.status === 404) throw new ApiError('Pokémon species not found', 404);
    if (!res.ok) throw new ApiError('Failed to fetch species data', res.status);
    return await res.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Something went wrong while loading species data.');
  }
}

export async function getEvolutionChainData(url: string): Promise<EvolutionChainResponse> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new ApiError('Failed to fetch evolution chain', res.status);
    return await res.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Something went wrong while loading evolution data.');
  }
}
