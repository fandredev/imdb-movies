import { CustomMoviesInterface } from '../share/movies-interface';

interface NumResultsProps extends CustomMoviesInterface {}

export default function NumResults({ movies }: NumResultsProps) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
