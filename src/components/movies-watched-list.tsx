import { CustomMoviesWatchedInterface } from '../share/movies-interface';
import MovieWatched from './movie-watched';

export interface MoviesWatchedListProps extends CustomMoviesWatchedInterface {
  onRemoveWatchMovies: (id: string) => void;
}

export default function MoviesWatchedList({
  watched,
  onRemoveWatchMovies,
}: MoviesWatchedListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <MovieWatched
          key={movie.imdbID}
          onRemoveWatchMovies={onRemoveWatchMovies}
          watched={movie}
        />
      ))}
    </ul>
  );
}
