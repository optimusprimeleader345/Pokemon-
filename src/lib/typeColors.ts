export interface TypeColorPair {
  bg: string;
  text: string;
  darkBg: string;
  darkText: string;
  border: string;
  darkBorder: string;
}

export const typeColors: Record<string, TypeColorPair> = {
  normal:   { bg: 'bg-stone-200',   text: 'text-stone-800',   darkBg: 'dark:bg-stone-800/60',   darkText: 'dark:text-stone-200',   border: 'border-t-stone-400',   darkBorder: 'dark:border-t-stone-500' },
  fire:     { bg: 'bg-orange-200',  text: 'text-orange-900',  darkBg: 'dark:bg-orange-950/70',  darkText: 'dark:text-orange-200',  border: 'border-t-orange-500',  darkBorder: 'dark:border-t-orange-400' },
  water:    { bg: 'bg-blue-200',    text: 'text-blue-900',    darkBg: 'dark:bg-blue-950/70',    darkText: 'dark:text-blue-200',    border: 'border-t-blue-500',    darkBorder: 'dark:border-t-blue-400' },
  electric: { bg: 'bg-yellow-200',  text: 'text-amber-950',   darkBg: 'dark:bg-yellow-950/70',  darkText: 'dark:text-yellow-200',  border: 'border-t-yellow-500',  darkBorder: 'dark:border-t-yellow-400' },
  grass:    { bg: 'bg-emerald-200', text: 'text-emerald-900', darkBg: 'dark:bg-emerald-950/70', darkText: 'dark:text-emerald-200', border: 'border-t-emerald-500', darkBorder: 'dark:border-t-emerald-400' },
  ice:      { bg: 'bg-cyan-100',    text: 'text-cyan-900',    darkBg: 'dark:bg-cyan-950/70',    darkText: 'dark:text-cyan-200',    border: 'border-t-cyan-400',    darkBorder: 'dark:border-t-cyan-300' },
  fighting: { bg: 'bg-red-200',     text: 'text-red-950',     darkBg: 'dark:bg-red-950/70',     darkText: 'dark:text-red-200',     border: 'border-t-red-600',     darkBorder: 'dark:border-t-red-400' },
  poison:   { bg: 'bg-purple-200',  text: 'text-purple-950',  darkBg: 'dark:bg-purple-950/70',  darkText: 'dark:text-purple-200',  border: 'border-t-purple-600',  darkBorder: 'dark:border-t-purple-400' },
  ground:   { bg: 'bg-amber-200',   text: 'text-amber-950',   darkBg: 'dark:bg-amber-950/70',   darkText: 'dark:text-amber-200',   border: 'border-t-amber-600',   darkBorder: 'dark:border-t-amber-500' },
  flying:   { bg: 'bg-sky-200',     text: 'text-sky-900',     darkBg: 'dark:bg-sky-950/70',     darkText: 'dark:text-sky-200',     border: 'border-t-sky-400',     darkBorder: 'dark:border-t-sky-300' },
  psychic:  { bg: 'bg-fuchsia-200', text: 'text-fuchsia-950', darkBg: 'dark:bg-fuchsia-950/70', darkText: 'dark:text-fuchsia-200', border: 'border-t-fuchsia-500', darkBorder: 'dark:border-t-fuchsia-400' },
  bug:      { bg: 'bg-lime-200',    text: 'text-lime-950',    darkBg: 'dark:bg-lime-950/70',    darkText: 'dark:text-lime-200',    border: 'border-t-lime-500',    darkBorder: 'dark:border-t-lime-400' },
  rock:     { bg: 'bg-stone-300',   text: 'text-stone-900',   darkBg: 'dark:bg-stone-800/80',   darkText: 'dark:text-stone-200',   border: 'border-t-stone-600',   darkBorder: 'dark:border-t-stone-400' },
  ghost:    { bg: 'bg-violet-200',  text: 'text-violet-950',  darkBg: 'dark:bg-violet-950/70',  darkText: 'dark:text-violet-200',  border: 'border-t-violet-600',  darkBorder: 'dark:border-t-violet-400' },
  dragon:   { bg: 'bg-indigo-200',  text: 'text-indigo-950',  darkBg: 'dark:bg-indigo-950/70',  darkText: 'dark:text-indigo-200',  border: 'border-t-indigo-600',  darkBorder: 'dark:border-t-indigo-400' },
  dark:     { bg: 'bg-neutral-300', text: 'text-neutral-900', darkBg: 'dark:bg-neutral-800',    darkText: 'dark:text-neutral-200', border: 'border-t-neutral-600', darkBorder: 'dark:border-t-neutral-400' },
  steel:    { bg: 'bg-slate-300',   text: 'text-slate-900',   darkBg: 'dark:bg-slate-800',    darkText: 'dark:text-slate-200',   border: 'border-t-slate-500',   darkBorder: 'dark:border-t-slate-400' },
  fairy:    { bg: 'bg-pink-200',    text: 'text-pink-900',    darkBg: 'dark:bg-pink-950/70',    darkText: 'dark:text-pink-200',    border: 'border-t-pink-400',    darkBorder: 'dark:border-t-pink-300' },
};

const defaultTypeColor: TypeColorPair = {
  bg: 'bg-gray-200',
  text: 'text-gray-700',
  darkBg: 'dark:bg-gray-700',
  darkText: 'dark:text-gray-300',
  border: 'border-t-gray-400',
  darkBorder: 'dark:border-t-gray-500',
};

export function getTypeColor(type: string): TypeColorPair {
  if (!type) {
    return defaultTypeColor;
  }
  
  const normalizedType = type.toLowerCase().trim();
  const colorPair = typeColors[normalizedType];

  if (!colorPair) {
    console.warn(`[getTypeColor] Warning: Type "${type}" (normalized: "${normalizedType}") not found in typeColors map. Falling back to default.`);
    return defaultTypeColor;
  }

  return colorPair;
}
