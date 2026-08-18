'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'pokemon-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(new Set(JSON.parse(stored)));
      }
    } catch {
      // Silently fail if localStorage is unavailable
    }
    setIsLoaded(true);
  }, []);

  // Persist to localStorage whenever favorites change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favorites)));
    } catch {
      // Silently fail
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = useCallback((name: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (name: string) => favorites.has(name),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}
