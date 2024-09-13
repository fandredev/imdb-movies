import { MovieDataTemporaryProps } from '../utils/movie-data-temporary';
import { MovieDataWatchedProps } from '../utils/movie-data-watch-temporary';

export interface CustomMoviesInterface {
  movies: MovieDataTemporaryProps[];
}

export interface CustomMoviesWatchedInterface {
  watched: MovieDataWatchedProps[];
}

export interface CustomMovieWatchedInterface {
  watched: MovieDataWatchedProps;
}
