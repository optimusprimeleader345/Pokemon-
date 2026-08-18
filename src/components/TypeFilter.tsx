'use client';

import { PokemonTypeOption } from '@/types/pokemon';
import { typeColors } from '@/lib/typeColors';

// Inline hex colors for the colored dot (since Tailwind bg classes don't work in <option> elements)
const typeHexColors: Record<string, string> = {
  normal: '#a8a29e', fire: '#f97316', water: '#3b82f6', electric: '#eab308',
  grass: '#10b981', ice: '#06b6d4', fighting: '#dc2626', poison: '#9333ea',
  ground: '#d97706', flying: '#38bdf8', psychic: '#d946ef', bug: '#84cc16',
  rock: '#78716c', ghost: '#7c3aed', dragon: '#4f46e5', dark: '#525252',
  steel: '#64748b', fairy: '#f472b6',
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
