'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'pokemon-recently-viewed';
const MAX_RECENT = 5;

export interface RecentPokemon {
  name: string;
  id: number;
  sprite: string;
}

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentPokemon[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecentlyViewed(JSON.parse(stored));
      }
    } catch {
      // Silently fail
    }
    setIsLoaded(true);
  }, []);

  // Persist to localStorage whenever list changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentlyViewed));
    } catch {
      // Silently fail
    }
  }, [recentlyViewed, isLoaded]);

  const addRecentlyViewed = useCallback((pokemon: RecentPokemon) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists (to move to front)
      const filtered = prev.filter((p) => p.name !== pokemon.name);
      // Add to front, keep max
      return [pokemon, ...filtered].slice(0, MAX_RECENT);
    });
  }, []);

  return { recentlyViewed, addRecentlyViewed, isLoaded };
}
