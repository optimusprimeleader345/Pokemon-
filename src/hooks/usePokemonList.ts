'use client';

import { useState, useEffect, useCallback } from 'react';
import { PokemonCardData, SortOption } from '@/types/pokemon';
import {
  getPokemonList,
  getPokemonByName,
  getPokemonByType,
  ApiError,
} from '@/services/pokemonApi';

interface UsePokemonListReturn {
  pokemon: PokemonCardData[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  searchNotFound: boolean;
  hasMore: boolean;
  searchTerm: string;
  selectedType: string;
  sortBy: SortOption;
  loadMore: () => void;
  search: (term: string) => void;
  filterByType: (type: string) => void;
  setSortBy: (sort: SortOption) => void;
  clearSearch: () => void;
}

function sortPokemon(pokemon: PokemonCardData[], sortBy: SortOption): PokemonCardData[] {
  const sorted = [...pokemon];
  switch (sortBy) {
    case 'id':
      return sorted.sort((a, b) => a.id - b.id);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'attack':
      return sorted.sort((a, b) => b.attack - a.attack);
    case 'speed':
      return sorted.sort((a, b) => b.speed - a.speed);
    case 'hp':
      return sorted.sort((a, b) => b.hp - a.hp);
    default:
      return sorted;
  }
}

export function usePokemonList(): UsePokemonListReturn {
  const [allPokemon, setAllPokemon] = useState<PokemonCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchNotFound, setSearchNotFound] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortByState] = useState<SortOption>('id');
  const [isFiltered, setIsFiltered] = useState(false);

  const LIMIT = 20;

  // Initial load
  useEffect(() => {
    let cancelled = false;
    async function fetchInitial() {
      setLoading(true);
      setError(null);
      setSearchNotFound(false);
      try {
        const result = await getPokemonList(LIMIT, 0);
        if (!cancelled) {
          setAllPokemon(result.pokemon);
          setTotal(result.total);
          setOffset(LIMIT);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'Something went wrong.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchInitial();
    return () => { cancelled = true; };
  }, []);

  const loadMore = useCallback(async () => {
    if (loadingMore || isFiltered) return;
    setLoadingMore(true);
    setError(null);
    try {
      const result = await getPokemonList(LIMIT, offset);
      setAllPokemon((prev) => [...prev, ...result.pokemon]);
      setOffset((prev) => prev + LIMIT);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load more Pokémon.');
    } finally {
      setLoadingMore(false);
    }
  }, [offset, loadingMore, isFiltered]);

  const search = useCallback(async (term: string) => {
    const trimmed = term.trim();
    setSearchTerm(trimmed);
    if (!trimmed) {
      // Reset to initial list
      setIsFiltered(false);
      setSearchNotFound(false);
      setSelectedType('');
      setLoading(true);
      setError(null);
      try {
        const result = await getPokemonList(LIMIT, 0);
        setAllPokemon(result.pokemon);
        setTotal(result.total);
        setOffset(LIMIT);
      } catch (err) {
        setError(err instanceof ApiError ? err.message : 'Something went wrong.');
      } finally {
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    setError(null);
    setSearchNotFound(false);
    setIsFiltered(true);
    setSelectedType('');
    try {
      const result = await getPokemonByName(trimmed);
      if (result) {
        setAllPokemon([result]);
      } else {
        setAllPokemon([]);
        setSearchNotFound(true);
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, []);

  const filterByType = useCallback(async (type: string) => {
    setSelectedType(type);
    setSearchTerm('');
    setSearchNotFound(false);

    if (!type) {
      // Reset to paginated list
      setIsFiltered(false);
      setLoading(true);
      setError(null);
      try {
        const result = await getPokemonList(LIMIT, 0);
        setAllPokemon(result.pokemon);
        setTotal(result.total);
        setOffset(LIMIT);
      } catch (err) {
        setError(err instanceof ApiError ? err.message : 'Something went wrong.');
      } finally {
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    setError(null);
    setIsFiltered(true);
    try {
      const result = await getPokemonByType(type);
      setAllPokemon(result);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    search('');
  }, [search]);

  const setSortBy = useCallback((sort: SortOption) => {
    setSortByState(sort);
  }, []);

  const hasMore = !isFiltered && offset < total;
  const pokemon = sortPokemon(allPokemon, sortBy);

  return {
    pokemon,
    loading,
    loadingMore,
    error,
    searchNotFound,
    hasMore,
    searchTerm,
    selectedType,
    sortBy,
    loadMore,
    search,
    filterByType,
    setSortBy,
    clearSearch,
  };
}
