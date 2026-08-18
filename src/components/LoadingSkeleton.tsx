import PokemonGrid from './PokemonGrid';

export default function LoadingSkeleton() {
  const skeletons = Array.from({ length: 8 }, (_, i) => i);

  return (
    <PokemonGrid>
      {skeletons.map((i) => (
        <div
          key={i}
          className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4"
        >
          <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-48 w-full animate-pulse mb-4"></div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-12 animate-pulse mb-2"></div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded h-6 w-32 animate-pulse mb-4"></div>
          <div className="flex gap-2">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-6 w-16 animate-pulse"></div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-6 w-16 animate-pulse"></div>
          </div>
        </div>
      ))}
    </PokemonGrid>
  );
}
