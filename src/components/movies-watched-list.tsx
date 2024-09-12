import { CustomMoviesWatchedInterface } from '../share/movies-interface';
import MovieWatched from './movie-watched';

interface MoviesWatchedListProps extends CustomMoviesWatchedInterface {}

export default function MoviesWatchedList({ watched }: MoviesWatchedListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <MovieWatched key={movie.imdbID} watched={movie} />
      ))}
    </ul>
  );
}
