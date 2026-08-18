'use client';

import { useState, useCallback } from 'react';

export function useCompare() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleCompare = useCallback((name: string) => {
    setSelected((prev) => {
      if (prev.includes(name)) {
        // Deselect
        return prev.filter((n) => n !== name);
      }
      if (prev.length >= 2) {
        // Replace oldest (FIFO)
        return [prev[1], name];
      }
      // Add to selection
      return [...prev, name];
    });
  }, []);

  const clearCompare = useCallback(() => {
    setSelected([]);
  }, []);

  const isCompareSelected = useCallback(
    (name: string) => selected.includes(name),
    [selected]
  );

  const canCompare = selected.length === 2;

  return { selected, toggleCompare, clearCompare, isCompareSelected, canCompare };
}
