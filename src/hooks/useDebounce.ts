import { useEffect, useState } from "react";

/**
 * Returns a debounced copy of `value` that only updates after `value` has
 * stopped changing for `delay` ms.
 *
 * The key insight: each time `value` changes we schedule a timeout, and the
 * effect cleanup CLEARS the previous timeout. So while the user is typing,
 * timers keep getting cancelled and only the last one survives.
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
