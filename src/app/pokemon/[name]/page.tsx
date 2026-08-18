import { getPokemonDetail } from '@/services/pokemonApi';
import { ApiError } from '@/services/pokemonApi';
import DetailClient from './DetailClient';

interface PageProps {
  params: { name: string };
}

export default async function PokemonDetailPage({ params }: PageProps) {
  try {
    const pokemon = await getPokemonDetail(params.name);
    return <DetailClient pokemon={pokemon} />;
  } catch (error) {
    const message =
      error instanceof ApiError
        ? error.message
        : 'Something went wrong loading this Pokémon.';
    const is404 = error instanceof ApiError && error.status === 404;

    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
            <span className="text-3xl">😢</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {is404 ? 'Pokémon not found' : 'Oops!'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
            {message}
          </p>
          <a
            href="/"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Back to Explorer
          </a>
        </div>
      </main>
    );
  }
}
