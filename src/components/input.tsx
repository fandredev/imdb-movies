import React, { useRef } from 'react';
import { useKey } from '../hooks/useKey';

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
  const inputElement = useRef<HTMLInputElement | null>(null);

  useKey('Enter', () => {
    if (document.activeElement === inputElement.current) return;
    inputElement.current?.focus();
    setQuery('');
  });

  return (
    <input
      {...rest}
      ref={inputElement}
      className="search"
      type="text"
      placeholder={placeholder}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
