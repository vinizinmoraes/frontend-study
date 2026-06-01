import { useEffect, useState } from "react";

/**
 * useState that persists to localStorage.
 *
 * Notes for the interview:
 * - The lazy initializer (`useState(() => ...)`) means we only read/parse from
 *   localStorage ONCE, not on every render.
 * - Reads are wrapped in try/catch because JSON.parse can throw and
 *   localStorage can be unavailable (private mode, SSR, quota).
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore write errors (quota exceeded, etc.)
    }
  }, [key, value]);

  return [value, setValue] as const;
}
