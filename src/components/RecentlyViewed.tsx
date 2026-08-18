'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import { RecentPokemon } from '@/hooks/useRecentlyViewed';

interface RecentlyViewedProps {
  pokemon: RecentPokemon[];
}

export default function RecentlyViewed({ pokemon }: RecentlyViewedProps) {
  if (pokemon.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-gray-400" />
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Recently Viewed
        </h2>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
        {pokemon.map((p) => (
          <Link
            key={p.name}
            href={`/pokemon/${p.name}`}
            className="flex flex-col items-center gap-1.5 flex-shrink-0 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl p-2"
          >
            <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden group-hover:shadow-md group-hover:scale-105 transition-all duration-150">
              <Image
                src={p.sprite}
                alt={p.name}
                width={48}
                height={48}
                unoptimized
                className="object-contain"
              />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 capitalize font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
              {p.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
