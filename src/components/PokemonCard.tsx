'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, GitCompareArrows } from 'lucide-react';
import { getTypeColor } from '@/lib/typeColors';
import { PokemonCardData } from '@/types/pokemon';

interface PokemonCardProps {
  pokemon: PokemonCardData;
  isFavorite: boolean;
  onToggleFavorite: (name: string) => void;
  isCompareSelected?: boolean;
  onToggleCompare?: (name: string) => void;
}

export default function PokemonCard({
  pokemon,
  isFavorite,
  onToggleFavorite,
  isCompareSelected = false,
  onToggleCompare,
}: PokemonCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(pokemon.name);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleCompare?.(pokemon.name);
  };

  const paddedId = String(pokemon.id).padStart(3, '0');
  const primaryType = pokemon.types[0] || 'normal';
  const primaryColors = getTypeColor(primaryType);

  return (
    <Link href={`/pokemon/${pokemon.name}`} className="block focus:outline-none focus-within:ring-2 focus-within:ring-blue-500 rounded-2xl">
      <div
        className={`relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-150 p-4 border-t-[3px] ${primaryColors.border} ${primaryColors.darkBorder} ${
          isCompareSelected ? 'ring-2 ring-blue-500 bg-blue-50/50 dark:bg-blue-900/10' : ''
        }`}
      >
        {/* Action buttons */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1">
          {onToggleCompare && (
            <button
              onClick={handleCompareClick}
              className={`p-1.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isCompareSelected
                  ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                  : 'text-gray-400 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              aria-label={isCompareSelected ? 'Remove from comparison' : 'Add to comparison'}
              title={isCompareSelected ? 'Remove from comparison' : 'Compare'}
            >
              <GitCompareArrows className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleFavoriteClick}
            className="p-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
              }`}
            />
          </button>
        </div>

        <div className="flex justify-center mb-4">
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={200}
            height={200}
            unoptimized
            className="object-contain"
          />
        </div>

        <div className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
          #{paddedId}
        </div>
        <h2 className="text-xl font-bold capitalize mb-3 text-gray-900 dark:text-white">
          {pokemon.name}
        </h2>

        <div className="flex flex-wrap gap-2">
          {pokemon.types.map((type) => {
            const colors = getTypeColor(type);
            return (
              <span
                key={type}
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText}`}
              >
                {type}
              </span>
            );
          })}
        </div>
      </div>
    </Link>
  );
}
