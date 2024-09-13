import React, { useEffect, useRef } from 'react';

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

  useEffect(() => {
    function callback({ code }: KeyboardEvent) {
      if (document.activeElement === inputElement.current) return;

      if (code === 'Enter') {
        inputElement.current?.focus();
        setQuery('');
      }
    }
    document.addEventListener('keydown', callback);

    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [setQuery]);

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
