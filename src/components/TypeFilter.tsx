'use client';

import { PokemonTypeOption } from '@/types/pokemon';
import { typeColors } from '@/lib/typeColors';

// Inline hex colors for the colored dot (since Tailwind bg classes don't work in <option> elements)
const typeHexColors: Record<string, string> = {
  normal: '#a8a29e', fire: '#fb923c', water: '#60a5fa', electric: '#facc15',
  grass: '#4ade80', ice: '#22d3ee', fighting: '#f87171', poison: '#c084fc',
  ground: '#fbbf24', flying: '#818cf8', psychic: '#f472b6', bug: '#a3e635',
  rock: '#78716c', ghost: '#a78bfa', dragon: '#6366f1', dark: '#525252',
  steel: '#94a3b8', fairy: '#f9a8d4',
};

interface TypeFilterProps {
  types: PokemonTypeOption[];
  selectedType: string;
  onSelect: (type: string) => void;
}

export default function TypeFilter({ types, selectedType, onSelect }: TypeFilterProps) {
  const selectedColor = selectedType ? (typeHexColors[selectedType] || '#9ca3af') : undefined;

  return (
    <div className="relative">
      {/* Colored dot indicator for current selection */}
      {selectedColor && (
        <div
          className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-10 pointer-events-none"
          style={{ backgroundColor: selectedColor }}
        />
      )}
      <select
        value={selectedType}
        onChange={(e) => onSelect(e.target.value)}
        className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer w-full sm:w-auto capitalize ${selectedColor ? 'pl-8' : 'pl-4'}`}
      >
        <option value="">All Types</option>
        {types.map((t) => {
          const hasColor = typeColors[t.name];
          return (
            <option key={t.name} value={t.name}>
              {hasColor ? '● ' : ''}{t.name.charAt(0).toUpperCase() + t.name.slice(1)}
            </option>
          );
        })}
      </select>
    </div>
  );
}
