'use client';

import { useEffect, useState } from 'react';
import { usePokemonList } from '@/hooks/usePokemonList';
import { useFavorites } from '@/hooks/useFavorites';
import { useCompare } from '@/hooks/useCompare';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { getAllTypes } from '@/services/pokemonApi';
import { PokemonTypeOption } from '@/types/pokemon';
import PokemonCard from '@/components/PokemonCard';
import PokemonGrid from '@/components/PokemonGrid';
import SearchBar from '@/components/SearchBar';
import TypeFilter from '@/components/TypeFilter';
import SortDropdown from '@/components/SortDropdown';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ErrorState from '@/components/ErrorState';
import DarkModeToggle from '@/components/DarkModeToggle';
import CompareButton from '@/components/CompareButton';
import RecentlyViewed from '@/components/RecentlyViewed';
import { Loader2, SearchX, ListFilter } from 'lucide-react';

export default function HomePage() {
  const {
    pokemon,
    loading,
    loadingMore,
    error,
    searchNotFound,
    hasMore,
    selectedType,
    sortBy,
    loadMore,
    search,
    filterByType,
    setSortBy,
    clearSearch,
  } = usePokemonList();

  const { toggleFavorite, isFavorite } = useFavorites();
  const { selected, toggleCompare, clearCompare, isCompareSelected } = useCompare();
  const { recentlyViewed } = useRecentlyViewed();
  const [types, setTypes] = useState<PokemonTypeOption[]>([]);

  useEffect(() => {
    getAllTypes()
      .then(setTypes)
      .catch(() => {
        // Silently fail — filter just won't have options
      });
  }, []);

  // Determine if we're in a filtered/search mode (no load more available)
  const isFiltered = !!selectedType || searchNotFound;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Pokémon Explorer
        </h1>
        <DarkModeToggle />
      </div>

      {/* Recently Viewed */}
      <RecentlyViewed pokemon={recentlyViewed} />

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchBar onSearch={search} disabled={loading} />
        </div>
        <div className="flex gap-3 flex-wrap">
          <TypeFilter
            types={types}
            selectedType={selectedType}
            onSelect={filterByType}
          />
          <SortDropdown sortBy={sortBy} onSort={setSortBy} />
        </div>
      </div>

      {/* Error state */}
      {error && (
        <ErrorState
          message={error}
          onRetry={clearSearch}
        />
      )}

      {/* Search not found state */}
      {searchNotFound && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <SearchX className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Pokémon not found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
            We couldn&apos;t find a Pokémon with that name. Make sure you&apos;re
            searching by the exact name (e.g. &quot;pikachu&quot;, &quot;charizard&quot;).
          </p>
          <button
            onClick={clearSearch}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading && !error && !searchNotFound && <LoadingSkeleton />}

      {/* Pokemon grid */}
      {!loading && !error && !searchNotFound && pokemon.length > 0 && (
        <>
          <PokemonGrid>
            {pokemon.map((p) => (
              <PokemonCard
                key={p.id}
                pokemon={p}
                isFavorite={isFavorite(p.name)}
                onToggleFavorite={toggleFavorite}
                isCompareSelected={isCompareSelected(p.name)}
                onToggleCompare={toggleCompare}
              />
            ))}
          </PokemonGrid>

          {/* Load More button — only when there are more to fetch */}
          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="px-8 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loadingMore ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading...
                  </span>
                ) : (
                  'Load More'
                )}
              </button>
            </div>
          )}

          {/* End of filtered results message */}
          {!hasMore && isFiltered && pokemon.length > 0 && (
            <div className="flex flex-col items-center justify-center mt-10 py-6 text-center">
              <ListFilter className="w-8 h-8 text-gray-300 dark:text-gray-600 mb-2" />
              <p className="text-sm text-gray-400 dark:text-gray-500">
                {selectedType
                  ? `That's all the ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}-type Pokémon we've got!`
                  : 'No more results to show.'}
              </p>
            </div>
          )}
        </>
      )}

      {/* Empty state when filtered but no results (not search-not-found) */}
      {!loading && !error && !searchNotFound && pokemon.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No Pokémon to display.
          </p>
        </div>
      )}

      {/* Floating compare button */}
      <CompareButton selected={selected} onClear={clearCompare} />
    </main>
  );
}
