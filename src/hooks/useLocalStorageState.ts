import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MovieDataWatchedProps } from '../utils/movie-data-watch-temporary';

export function useLocalStorageState(
  initialState: MovieDataWatchedProps[],
  key: string
): [
  MovieDataWatchedProps[],
  Dispatch<SetStateAction<MovieDataWatchedProps[]>>
] {
  const [value, setValue] = useState<MovieDataWatchedProps[]>(() => {
    const storedMovie = localStorage.getItem(key);
    return storedMovie ? JSON.parse(storedMovie) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
