'use client';

import { useEffect, useState } from 'react';

interface StatBarProps {
  name: string;
  value: number;
  maxValue?: number;
}

export default function StatBar({ name, value, maxValue = 255 }: StatBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(Math.min((value / maxValue) * 100, 100));
    }, 100);
    return () => clearTimeout(timer);
  }, [value, maxValue]);

  const statName = name.replace(/-/g, ' ');

  let barColorClass = 'bg-red-500';
  if (value >= 120) {
    barColorClass = 'bg-green-500';
  } else if (value >= 80) {
    barColorClass = 'bg-yellow-400';
  } else if (value >= 50) {
    barColorClass = 'bg-orange-400';
  }

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
          {statName}
        </span>
        <span className="text-sm font-bold text-gray-900 dark:text-white">{value}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-700 ease-out ${barColorClass}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
