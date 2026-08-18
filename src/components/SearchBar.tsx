'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  disabled?: boolean;
}

export default function SearchBar({ onSearch, disabled = false }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Search Pokémon..."
        className="block w-full pl-10 pr-24 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:opacity-50"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 gap-1">
        {query && (
          <button
            onClick={handleClear}
            disabled={disabled}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        <button
          onClick={handleSearch}
          disabled={disabled}
          className="ml-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none disabled:opacity-50"
        >
          Search
        </button>
      </div>
    </div>
  );
}
