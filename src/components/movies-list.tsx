import { CustomMoviesInterface } from '../share/movies-interface';
import { MovieDataTemporaryProps } from '../utils/movie-data-temporary';
import Movie from './movie';

export interface MoviesListProps extends CustomMoviesInterface {
  onSelectMovie: (id: string) => void;
  movies: MovieDataTemporaryProps[];
}

export default function MoviesList({ movies, onSelectMovie }: MoviesListProps) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
