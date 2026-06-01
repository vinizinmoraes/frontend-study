import { useEffect, useRef } from "react";

/**
 * Dan Abramov's "declarative setInterval".
 *
 * Why a custom hook? If you call setInterval inside an effect and reference
 * state directly in the callback, you capture a STALE value (the value from the
 * render that created the interval). This hook keeps the latest callback in a
 * ref, so the interval always runs the freshest closure without being torn down
 * and recreated on every render.
 *
 * Pass `delay = null` to pause.
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Always keep the ref pointing at the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
