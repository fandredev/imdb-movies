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
}

export default function MovieDetails({
  selectedMovieId,
  onCloseMovieDetail,
  onAddWatchedMovie,
}: MovieDetatilsProps) {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loadingMovie, setLoadingMovie] = useState(false);

  function handleAddWatchedMovie() {
    if (!movie) return;

    const newWatchedMovie: MovieDataWatchedProps = {
      imdbID: selectedMovieId,
      Title: movie.Title,
      Year: movie.Year,
      runtime: Number(movie?.Runtime.split(' ').at(0)),
      imdbRating: +movie.imdbRating,
      Poster: movie.Poster,
      userRating: 0,
    };
    onAddWatchedMovie(newWatchedMovie);
  }

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
              <StarRating
                // onRatingChange={(rating) => console.log(rating)}
                maxRating={10}
                size={24}
              />
              <button
                className="btn-add"
                onClick={() => handleAddWatchedMovie()}
              >
                + Add to Watched
              </button>
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