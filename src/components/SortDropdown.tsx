'use client';

import { SortOption } from '@/types/pokemon';

interface SortDropdownProps {
  sortBy: SortOption;
  onSort: (sort: SortOption) => void;
}

export default function SortDropdown({ sortBy, onSort }: SortDropdownProps) {
  return (
    <select
      value={sortBy}
      onChange={(e) => onSort(e.target.value as SortOption)}
      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer w-full sm:w-auto"
    >
      <option value="id">ID (Lowest first)</option>
      <option value="name">Name (A-Z)</option>
      <option value="attack">Attack (Highest)</option>
      <option value="speed">Speed (Highest)</option>
      <option value="hp">HP (Highest)</option>
    </select>
  );
}
