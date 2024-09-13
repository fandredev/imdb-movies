import { useEffect, useState } from 'react';
import { API_KEY } from '../utils/api-key';
import { MovieDataTemporaryProps } from '../utils/movie-data-temporary';

interface UseMoviesReturnProps {
  isLoading: boolean;
  error: string;
  movies: MovieDataTemporaryProps[];
}

export function useMovies(queryMovies: string): UseMoviesReturnProps {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [movies, setMovies] = useState<MovieDataTemporaryProps[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function getMovies() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://www.omdbapi.com/?&apikey=${API_KEY}&s=${queryMovies}`,
          {
            signal: controller.signal,
          }
        );
        if (!response.ok) {
          setIsLoading(false);
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.Response === 'False') throw new Error('Movie not found');

        setMovies(data.Search);
        // handleSelectMovie(data.imdbId);
      } catch (error: any) {
        if (error.name !== 'AbortError') setError(error.message as string);
      } finally {
        setIsLoading(false);
        setError('');
      }
    }

    if (queryMovies.length <= 2) {
      setMovies([]);
      setError('');

      return;
    }

    // handleCloseMovie();
    getMovies();

    return () => controller.abort();
  }, [queryMovies]);

  return { isLoading, error, movies };
}
