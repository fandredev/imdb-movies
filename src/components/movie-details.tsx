import { MovieDetail } from '../utils/movie-data-details';

import { useEffect, useState } from 'react';
import { API_KEY } from '../utils/api-key';
import StarRating from './star-rating';
import Loader from './loader';
import { MovieDataWatchedProps } from '../utils/movie-data-watch-temporary';

interface MovieDetatilsProps {
  selectedMovieId: string;
  onCloseMovieDetail: () => void;
  onAddWatchedMovie: (movie: MovieDataWatchedProps) => void;
  watchedMovies: MovieDataWatchedProps[];
}

export default function MovieDetails({
  selectedMovieId,
  onCloseMovieDetail,
  onAddWatchedMovie,
  watchedMovies,
}: MovieDetatilsProps) {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loadingMovie, setLoadingMovie] = useState(false);
  const [userRating, setUserRating] = useState(0);

  function handleAddWatchedMovie() {
    if (!movie) return;

    const newWatchedMovie: MovieDataWatchedProps = {
      imdbID: selectedMovieId,
      Title: movie.Title,
      Year: movie.Year,
      runtime: Number(movie?.Runtime.split(' ').at(0)),
      imdbRating: +movie.imdbRating,
      Poster: movie.Poster,
      userRating,
    };
    onAddWatchedMovie(newWatchedMovie);
    onCloseMovieDetail();
  }

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onCloseMovieDetail();
      }
    }
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [onCloseMovieDetail]);

  useEffect(() => {
    async function getMovieDetails() {
      setLoadingMovie(true);
      const response = await fetch(
        `https://www.omdbapi.com/?&apikey=${API_KEY}&i=${selectedMovieId}`
      );

      const data = await response.json();
      setMovie(data);
      setLoadingMovie(false);
    }
    getMovieDetails();
  }, [selectedMovieId]);

  useEffect(() => {
    document.title = `Movie Search: ${movie?.Title || 'Details'}`;

    return () => {
      document.title = 'usePopcorn';
    };
  }, [movie?.Title]);

  const isWatchedMovie = watchedMovies
    .map((movie) => movie.imdbID)
    .includes(selectedMovieId);

  const watchedUserRating = watchedMovies.find(
    (movie) => movie.imdbID === selectedMovieId
  )?.userRating;

  return (
    <div className="details">
      {movie && !loadingMovie && (
        <>
          <header>
            <button className="btn-back" onClick={() => onCloseMovieDetail()}>
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>
                {movie.Title} ({movie.Year})
              </h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating} IMDB Rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatchedMovie ? (
                <>
                  <StarRating
                    onSetRating={setUserRating}
                    maxRating={10}
                    size={24}
                  />

                  {userRating > 0 && (
                    <button
                      className="btn-add"
                      onClick={() => handleAddWatchedMovie()}
                    >
                      + Add to Watched
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rate with movie: {watchedUserRating}
                  <span> ⭐</span>
                </p>
              )}
            </div>

            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
      {loadingMovie && <Loader />}
    </div>
  );
}
