import { useEffect } from 'react';

export function useKey(key: string, action: () => void) {
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [key, action]);
}
