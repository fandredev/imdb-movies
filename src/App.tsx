import { useEffect, useState } from 'react';
import Header from './components/navbar';
import Main from './components/main';
import Input from './components/input';
import NumResults from './components/num-results';
import Box from './components/box';
import MoviesList from './components/movies-list';
import { MovieDataWatchedProps } from './utils/movie-data-watch-temporary';
import WatchedMoviesSummary from './components/watched-summary';
import MoviesWatchedList from './components/movies-watched-list';
import Loader from './components/loader';
import ErrorMessage from './components/error-message';
import MovieDetails from './components/movie-details';
import { useMovies } from './hooks/useMovies';

export default function App() {
  const [query, setQuery] = useState('');

  const [watched, setWatched] = useState<MovieDataWatchedProps[]>(() => {
    const watchedMovies = localStorage.getItem('watched_movies');
    return watchedMovies ? JSON.parse(watchedMovies) : [];
  });

  const { error, isLoading, movies } = useMovies(query);

  const [selectedMovieId, setSelectedMovieId] = useState<null | string>(null);

  function handleSelectMovie(id: string) {
    setSelectedMovieId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedMovieId(null);
  }

  function handleAddWatched(movie: MovieDataWatchedProps) {
    setWatched((prevWatched) => [...prevWatched, movie]);
    // localStorage.setItem('watched_movies', JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id: string) {
    setWatched((prevWatched) =>
      prevWatched.filter((movie) => movie.imdbID !== id)
    );
  }

  useEffect(() => {
    localStorage.setItem('watched_movies', JSON.stringify(watched));
  }, [watched]);

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
              onAddWatchedMovie={handleAddWatched}
              watchedMovies={watched}
            />
          ) : (
            <>
              <WatchedMoviesSummary watched={watched} />
              <MoviesWatchedList
                watched={watched}
                onRemoveWatchMovies={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
