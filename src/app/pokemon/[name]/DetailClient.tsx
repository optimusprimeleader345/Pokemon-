'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { PokemonDetail } from '@/types/pokemon';
import { getTypeColor } from '@/lib/typeColors';
import StatBar from '@/components/StatBar';
import EvolutionChain from '@/components/EvolutionChain';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';

interface DetailClientProps {
  pokemon: PokemonDetail;
}

export default function DetailClient({ pokemon }: DetailClientProps) {
  const router = useRouter();
  const { addRecentlyViewed } = useRecentlyViewed();

  // Record this visit in recently viewed
  useEffect(() => {
    const sprite = pokemon.sprites.front_default ?? '';
    addRecentlyViewed({
      name: pokemon.name,
      id: pokemon.id,
      sprite,
    });
  }, [pokemon.name, pokemon.id, pokemon.sprites.front_default, addRecentlyViewed]);

  // Escape key navigates back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.push('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  const image =
    pokemon.sprites.other['official-artwork'].front_default ??
    pokemon.sprites.front_default ??
    '';

  const paddedId = String(pokemon.id).padStart(3, '0');
  const heightM = (pokemon.height / 10).toFixed(1);
  const weightKg = (pokemon.weight / 10).toFixed(1);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button
        onClick={() => router.push('/')}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Image */}
        <div className="flex justify-center items-start">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 w-full max-w-sm">
            {image && (
              <Image
                src={image}
                alt={pokemon.name}
                width={400}
                height={400}
                unoptimized
                className="w-full h-auto object-contain"
                priority
              />
            )}
          </div>
        </div>

        {/* Right: Details */}
        <div>
          <p className="text-gray-400 dark:text-gray-500 text-lg font-medium mb-1">
            #{paddedId}
          </p>
          <h1 className="text-4xl font-bold capitalize text-gray-900 dark:text-white mb-4">
            {pokemon.name}
          </h1>

          {/* Type badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {pokemon.types.map((t) => {
              const colors = getTypeColor(t.type.name);
              return (
                <span
                  key={t.type.name}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText}`}
                >
                  {t.type.name}
                </span>
              );
            })}
          </div>

          {/* Physical stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Height</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{heightM} m</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Weight</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{weightKg} kg</p>
            </div>
          </div>

          {/* Abilities */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Abilities</h2>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map((a) => (
                <span
                  key={a.ability.name}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium capitalize"
                >
                  {a.ability.name.replace(/-/g, ' ')}
                  {a.is_hidden && (
                    <span className="text-gray-400 dark:text-gray-500 ml-1 text-xs">(hidden)</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Base Stats */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Base Stats</h2>
            {pokemon.stats.map((s) => (
              <StatBar
                key={s.stat.name}
                name={s.stat.name}
                value={s.base_stat}
              />
            ))}
          </div>

          {/* Evolution Chain */}
          <EvolutionChain pokemonName={pokemon.name} />

          {/* Moves (first 10) */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Moves</h2>
            <div className="flex flex-wrap gap-2">
              {pokemon.moves.slice(0, 10).map((m) => (
                <span
                  key={m.move.name}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm capitalize"
                >
                  {m.move.name.replace(/-/g, ' ')}
                </span>
              ))}
              {pokemon.moves.length > 10 && (
                <span className="px-3 py-1.5 text-gray-400 dark:text-gray-500 text-sm">
                  +{pokemon.moves.length - 10} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
