import { MovieDataTemporaryProps } from '../utils/movie-data-temporary';
import { MoviesListProps } from './movies-list';

interface MovieProps extends Pick<MoviesListProps, 'onSelectMovie'> {
  movie: MovieDataTemporaryProps;
}

export default function Movie({ movie, onSelectMovie }: MovieProps) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
