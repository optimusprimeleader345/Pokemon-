export const typeColors: Record<string, {
  bg: string;
  text: string;
  darkBg: string;
  darkText: string;
  border: string;
  darkBorder: string;
}> = {
  normal:   { bg: 'bg-stone-200',   text: 'text-stone-700',   darkBg: 'dark:bg-stone-700/50',   darkText: 'dark:text-stone-300',   border: 'border-stone-400',   darkBorder: 'dark:border-stone-500' },
  fire:     { bg: 'bg-orange-200',  text: 'text-orange-800',  darkBg: 'dark:bg-orange-900/50',  darkText: 'dark:text-orange-300',  border: 'border-orange-400',  darkBorder: 'dark:border-orange-500' },
  water:    { bg: 'bg-blue-200',    text: 'text-blue-800',    darkBg: 'dark:bg-blue-900/50',    darkText: 'dark:text-blue-300',    border: 'border-blue-400',    darkBorder: 'dark:border-blue-500' },
  electric: { bg: 'bg-yellow-200',  text: 'text-amber-800',   darkBg: 'dark:bg-yellow-900/50',  darkText: 'dark:text-yellow-300',  border: 'border-yellow-400',  darkBorder: 'dark:border-yellow-500' },
  grass:    { bg: 'bg-green-200',   text: 'text-green-800',   darkBg: 'dark:bg-green-900/50',   darkText: 'dark:text-green-300',   border: 'border-green-400',   darkBorder: 'dark:border-green-500' },
  ice:      { bg: 'bg-cyan-200',    text: 'text-cyan-800',    darkBg: 'dark:bg-cyan-900/50',    darkText: 'dark:text-cyan-300',    border: 'border-cyan-400',    darkBorder: 'dark:border-cyan-500' },
  fighting: { bg: 'bg-red-200',     text: 'text-red-900',     darkBg: 'dark:bg-red-900/50',     darkText: 'dark:text-red-300',     border: 'border-red-400',     darkBorder: 'dark:border-red-500' },
  poison:   { bg: 'bg-purple-200',  text: 'text-purple-800',  darkBg: 'dark:bg-purple-900/50',  darkText: 'dark:text-purple-300',  border: 'border-purple-400',  darkBorder: 'dark:border-purple-500' },
  ground:   { bg: 'bg-amber-200',   text: 'text-amber-900',   darkBg: 'dark:bg-amber-900/50',   darkText: 'dark:text-amber-300',   border: 'border-amber-400',   darkBorder: 'dark:border-amber-500' },
  flying:   { bg: 'bg-indigo-200',  text: 'text-indigo-800',  darkBg: 'dark:bg-indigo-900/50',  darkText: 'dark:text-indigo-300',  border: 'border-indigo-400',  darkBorder: 'dark:border-indigo-500' },
  psychic:  { bg: 'bg-pink-200',    text: 'text-pink-800',    darkBg: 'dark:bg-pink-900/50',    darkText: 'dark:text-pink-300',    border: 'border-pink-400',    darkBorder: 'dark:border-pink-500' },
  bug:      { bg: 'bg-lime-200',    text: 'text-lime-800',    darkBg: 'dark:bg-lime-900/50',    darkText: 'dark:text-lime-300',    border: 'border-lime-500',    darkBorder: 'dark:border-lime-500' },
  rock:     { bg: 'bg-stone-300',   text: 'text-stone-800',   darkBg: 'dark:bg-stone-700/50',   darkText: 'dark:text-stone-300',   border: 'border-stone-500',   darkBorder: 'dark:border-stone-500' },
  ghost:    { bg: 'bg-violet-200',  text: 'text-violet-800',  darkBg: 'dark:bg-violet-900/50',  darkText: 'dark:text-violet-300',  border: 'border-violet-400',  darkBorder: 'dark:border-violet-500' },
  dragon:   { bg: 'bg-indigo-300',  text: 'text-indigo-900',  darkBg: 'dark:bg-indigo-900/50',  darkText: 'dark:text-indigo-300',  border: 'border-indigo-500',  darkBorder: 'dark:border-indigo-500' },
  dark:     { bg: 'bg-neutral-300', text: 'text-neutral-900', darkBg: 'dark:bg-neutral-700/50', darkText: 'dark:text-neutral-300', border: 'border-neutral-500', darkBorder: 'dark:border-neutral-500' },
  steel:    { bg: 'bg-slate-300',   text: 'text-slate-800',   darkBg: 'dark:bg-slate-700/50',   darkText: 'dark:text-slate-300',   border: 'border-slate-400',   darkBorder: 'dark:border-slate-500' },
  fairy:    { bg: 'bg-pink-200',    text: 'text-rose-800',    darkBg: 'dark:bg-pink-900/50',    darkText: 'dark:text-pink-300',    border: 'border-pink-400',    darkBorder: 'dark:border-pink-500' },
};

const defaultTypeColor = {
  bg: 'bg-gray-200',
  text: 'text-gray-700',
  darkBg: 'dark:bg-gray-700',
  darkText: 'dark:text-gray-300',
  border: 'border-gray-400',
  darkBorder: 'dark:border-gray-500',
};

export function getTypeColor(type: string) {
  return typeColors[type] || defaultTypeColor;
}
