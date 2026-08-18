'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { EvolutionChainLink } from '@/types/pokemon';
import { getPokemonSpecies, getEvolutionChainData } from '@/services/pokemonApi';

interface EvolutionStep {
  name: string;
  id: number;
  sprite: string;
}

interface EvolutionChainProps {
  pokemonName: string;
}

function extractIdFromUrl(url: string): number {
  const parts = url.replace(/\/$/, '').split('/');
  return parseInt(parts[parts.length - 1], 10);
}

function parseChain(link: EvolutionChainLink): EvolutionStep[][] {
  const id = extractIdFromUrl(link.species.url);
  const current: EvolutionStep = {
    name: link.species.name,
    id,
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  };

  if (link.evolves_to.length === 0) {
    return [[current]];
  }

  const paths: EvolutionStep[][] = [];
  for (const evo of link.evolves_to) {
    const subPaths = parseChain(evo);
    for (const subPath of subPaths) {
      paths.push([current, ...subPath]);
    }
  }
  return paths;
}

export default function EvolutionChain({ pokemonName }: EvolutionChainProps) {
  const [paths, setPaths] = useState<EvolutionStep[][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function fetchChain() {
      try {
        setLoading(true);
        setError(false);
        const species = await getPokemonSpecies(pokemonName);
        const chain = await getEvolutionChainData(species.evolution_chain.url);
        if (!cancelled) {
          const parsed = parseChain(chain.chain);
          setPaths(parsed);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchChain();
    return () => { cancelled = true; };
  }, [pokemonName]);

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Evolution Chain</h2>
        <div className="flex items-center gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
              {i < 3 && <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || paths.length === 0) return null;

  // If all paths have only 1 step, no evolution exists
  if (paths.every((p) => p.length <= 1)) return null;

  // Deduplicate: if all paths share the same first step, we can show a tree
  // For simplicity, show unique paths. Most Pokémon have 1 path.
  // For Eevee-like cases, show up to 8 paths but share the common prefix visually.

  // Find common prefix length
  let commonPrefixLen = 0;
  if (paths.length > 1) {
    outer:
    for (let i = 0; i < paths[0].length; i++) {
      const name = paths[0][i].name;
      for (let j = 1; j < paths.length; j++) {
        if (!paths[j][i] || paths[j][i].name !== name) break outer;
      }
      commonPrefixLen = i + 1;
    }
  }

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Evolution Chain</h2>
      {paths.length === 1 ? (
        // Single evolution line
        <div className="flex items-center gap-2 flex-wrap">
          {paths[0].map((step, i) => (
            <div key={step.name} className="flex items-center gap-2">
              {i > 0 && <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />}
              <EvolutionStepCard step={step} isActive={step.name === pokemonName} />
            </div>
          ))}
        </div>
      ) : (
        // Branching evolution (e.g. Eevee)
        <div className="space-y-2">
          {/* Common prefix */}
          {commonPrefixLen > 0 && (
            <div className="flex items-center gap-2 mb-1">
              {paths[0].slice(0, commonPrefixLen).map((step, i) => (
                <div key={step.name} className="flex items-center gap-2">
                  {i > 0 && <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                  <EvolutionStepCard step={step} isActive={step.name === pokemonName} />
                </div>
              ))}
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
          )}
          {/* Branches */}
          <div className={`flex flex-wrap gap-2 ${commonPrefixLen > 0 ? 'ml-4' : ''}`}>
            {paths.map((path, pathIdx) => {
              const branch = path.slice(commonPrefixLen);
              if (branch.length === 0) return null;
              return (
                <div key={pathIdx} className="flex items-center gap-1">
                  {branch.map((step, i) => (
                    <div key={step.name} className="flex items-center gap-1">
                      {i > 0 && <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />}
                      <EvolutionStepCard step={step} isActive={step.name === pokemonName} small />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function EvolutionStepCard({ step, isActive, small }: { step: EvolutionStep; isActive: boolean; small?: boolean }) {
  const size = small ? 'w-12 h-12' : 'w-16 h-16';
  const imgSize = small ? 40 : 56;
  const textSize = small ? 'text-[10px]' : 'text-xs';

  return (
    <Link
      href={`/pokemon/${step.name}`}
      className={`flex flex-col items-center gap-1 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl p-1.5 transition-all ${
        isActive ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
      }`}
    >
      <div className={`${size} rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden`}>
        <Image
          src={step.sprite}
          alt={step.name}
          width={imgSize}
          height={imgSize}
          unoptimized
          className="object-contain"
        />
      </div>
      <span className={`${textSize} capitalize font-medium ${
        isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
      } transition-colors`}>
        {step.name}
      </span>
    </Link>
  );
}
