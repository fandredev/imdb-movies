import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
}

export default function Input({
  query,
  setQuery,
  placeholder = 'Search movies...',
  ...rest
}: InputProps) {
  return (
    <input
      {...rest}
      className="search"
      type="text"
      placeholder={placeholder}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
