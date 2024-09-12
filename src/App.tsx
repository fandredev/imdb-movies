import { useEffect, useState } from 'react';
import {
  tempMovieData,
  MovieDataTemporaryProps,
} from './utils/movie-data-temporary';
import Header from './components/navbar';
import Main from './components/main';
import Input from './components/input';
import NumResults from './components/num-results';
import Box from './components/box';
import MoviesList from './components/movies-list';
import {
  MovieDataWatchedProps,
  tempWatchedData,
} from './utils/movie-data-watch-temporary';
import WatchedMoviesSummary from './components/watched-summary';
import MoviesWatchedList from './components/movies-watched-list';
import Loader from './components/loader';
import ErrorMessage from './components/error-message';
import MovieDetails from './components/movie-details';
import { API_KEY } from './utils/api-key';

export default function App() {
  const [movies, setMovies] =
    useState<MovieDataTemporaryProps[]>(tempMovieData);
  const [query, setQuery] = useState('rio');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [watched, setWatched] =
    useState<MovieDataWatchedProps[]>(tempWatchedData);

  const [selectedMovieId, setSelectedMovieId] = useState<null | string>(null);

  function handleSelectMovie(id: string) {
    setSelectedMovieId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedMovieId(null);
  }

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://www.omdbapi.com/?&apikey=${API_KEY}&s=${query}`
        );
        if (!response.ok) {
          setIsLoading(false);
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.Response === 'False') throw new Error('Movie not found');

        setMovies(data.Search);
        handleSelectMovie(data.imdbId);
      } catch (error: any) {
        setError(error.message as string);
      } finally {
        setIsLoading(false);
        setError('');
      }
    }

    if (query.length <= 2) {
      setMovies([]);
      setError('');

      return;
    }

    getMovies();
  }, [query]);

  return (
    <>
      <Header>
        <Input query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Header>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedMovieId ? (
            <MovieDetails
              selectedMovieId={selectedMovieId}
              onCloseMovieDetail={handleCloseMovie}
            />
          ) : (
            <>
              <WatchedMoviesSummary watched={watched} />
              <MoviesWatchedList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
