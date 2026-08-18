'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, GitCompareArrows } from 'lucide-react';
import { PokemonDetail } from '@/types/pokemon';
import { getPokemonDetail } from '@/services/pokemonApi';
import { getTypeColor } from '@/lib/typeColors';
import DarkModeToggle from '@/components/DarkModeToggle';

const STAT_NAMES = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

function getStatValue(pokemon: PokemonDetail, statName: string): number {
  const stat = pokemon.stats.find((s) => s.stat.name === statName);
  return stat ? stat.base_stat : 0;
}

function StatCompareBar({ name, value1, value2, maxValue = 255 }: {
  name: string;
  value1: number;
  value2: number;
  maxValue?: number;
}) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const pct1 = Math.min((value1 / maxValue) * 100, 100);
  const pct2 = Math.min((value2 / maxValue) * 100, 100);
  const higher1 = value1 > value2;
  const higher2 = value2 > value1;
  const displayName = name.replace(/-/g, ' ').replace('special ', 'sp. ');

  return (
    <div className="mb-4">
      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize mb-2 text-center">
        {displayName}
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
        {/* Left bar (reversed direction) */}
        <div className="flex items-center gap-2 justify-end">
          <span className={`text-sm font-bold min-w-[32px] text-right ${higher1 ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
            {value1}
          </span>
          <div className="w-full max-w-[160px] bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-700 ease-out ${higher1 ? 'bg-green-500' : 'bg-blue-400'}`}
              style={{ width: animated ? `${pct1}%` : '0%', marginLeft: 'auto' }}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />

        {/* Right bar */}
        <div className="flex items-center gap-2">
          <div className="w-full max-w-[160px] bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-700 ease-out ${higher2 ? 'bg-green-500' : 'bg-red-400'}`}
              style={{ width: animated ? `${pct2}%` : '0%' }}
            />
          </div>
          <span className={`text-sm font-bold min-w-[32px] ${higher2 ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
            {value2}
          </span>
        </div>
      </div>
    </div>
  );
}

function PokemonColumn({ pokemon }: { pokemon: PokemonDetail }) {
  const image =
    pokemon.sprites.other['official-artwork'].front_default ??
    pokemon.sprites.front_default ??
    '';
  const paddedId = String(pokemon.id).padStart(3, '0');

  return (
    <div className="flex flex-col items-center text-center">
      <Link href={`/pokemon/${pokemon.name}`} className="group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-3 group-hover:shadow-md transition-shadow">
          {image && (
            <Image
              src={image}
              alt={pokemon.name}
              width={180}
              height={180}
              unoptimized
              className="object-contain"
            />
          )}
        </div>
      </Link>
      <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">#{paddedId}</p>
      <h2 className="text-xl font-bold capitalize text-gray-900 dark:text-white mb-2">{pokemon.name}</h2>
      <div className="flex flex-wrap gap-1.5 justify-center mb-2">
        {pokemon.types.map((t) => {
          const colors = getTypeColor(t.type.name);
          return (
            <span
              key={t.type.name}
              className={`px-3 py-0.5 rounded-full text-xs font-semibold capitalize ${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText}`}
            >
              {t.type.name}
            </span>
          );
        })}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {(pokemon.height / 10).toFixed(1)}m · {(pokemon.weight / 10).toFixed(1)}kg
      </div>
    </div>
  );
}

export default function ComparePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const p1 = searchParams.get('p1');
  const p2 = searchParams.get('p2');

  const [pokemon1, setPokemon1] = useState<PokemonDetail | null>(null);
  const [pokemon2, setPokemon2] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!p1 || !p2) {
      setError('Please select two Pok\u00e9mon to compare.');
      setLoading(false);
      return;
    }

    let cancelled = false;
    async function fetchBoth() {
      setLoading(true);
      setError(null);
      try {
        const [d1, d2] = await Promise.all([
          getPokemonDetail(p1!),
          getPokemonDetail(p2!),
        ]);
        if (!cancelled) {
          setPokemon1(d1);
          setPokemon2(d2);
        }
      } catch {
        if (!cancelled) setError('Failed to load Pok\u00e9mon for comparison.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchBoth();
    return () => { cancelled = true; };
  }, [p1, p2]);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
        <DarkModeToggle />
      </div>

      <div className="flex items-center justify-center gap-2 mb-8">
        <GitCompareArrows className="w-6 h-6 text-blue-500" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Compare Pokémon</h1>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="flex items-center gap-8">
            <div className="w-40 h-52 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <span className="text-2xl font-bold text-gray-300">VS</span>
            <div className="w-40 h-52 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
          >
            Go Back
          </button>
        </div>
      )}

      {/* Comparison */}
      {!loading && !error && pokemon1 && pokemon2 && (
        <div>
          {/* Side by side images + info */}
          <div className="grid grid-cols-2 gap-6 mb-10">
            <PokemonColumn pokemon={pokemon1} />
            <PokemonColumn pokemon={pokemon2} />
          </div>

          {/* Stat comparison */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 text-center">Base Stats</h3>
            {STAT_NAMES.map((stat) => (
              <StatCompareBar
                key={stat}
                name={stat}
                value1={getStatValue(pokemon1, stat)}
                value2={getStatValue(pokemon2, stat)}
              />
            ))}

            {/* Total */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
                <div className="text-right">
                  <span className={`text-lg font-bold ${
                    pokemon1.stats.reduce((a, s) => a + s.base_stat, 0) >= pokemon2.stats.reduce((a, s) => a + s.base_stat, 0)
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {pokemon1.stats.reduce((a, s) => a + s.base_stat, 0)}
                  </span>
                </div>
                <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase">Total</div>
                <div>
                  <span className={`text-lg font-bold ${
                    pokemon2.stats.reduce((a, s) => a + s.base_stat, 0) >= pokemon1.stats.reduce((a, s) => a + s.base_stat, 0)
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {pokemon2.stats.reduce((a, s) => a + s.base_stat, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
