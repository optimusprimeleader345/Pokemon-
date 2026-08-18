'use client';

import Link from 'next/link';
import { GitCompareArrows, X } from 'lucide-react';

interface CompareButtonProps {
  selected: string[];
  onClear: () => void;
}

export default function CompareButton({ selected, onClear }: CompareButtonProps) {
  if (selected.length === 0) return null;

  const canCompare = selected.length === 2;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg px-5 py-3">
      <GitCompareArrows className="w-5 h-5 text-blue-500" />
      <div className="text-sm text-gray-700 dark:text-gray-300">
        <span className="font-semibold capitalize">{selected[0]}</span>
        {selected[1] && (
          <>
            {' vs '}
            <span className="font-semibold capitalize">{selected[1]}</span>
          </>
        )}
        {!selected[1] && (
          <span className="text-gray-400 dark:text-gray-500 ml-1">— pick one more</span>
        )}
      </div>

      {canCompare && (
        <Link
          href={`/compare?p1=${selected[0]}&p2=${selected[1]}`}
          className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Compare
        </Link>
      )}

      <button
        onClick={onClear}
        className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors focus:outline-none"
        aria-label="Clear comparison"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
