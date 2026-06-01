import { useEffect, useRef } from "react";

/**
 * Calls `handler` when a pointer/touch event fires OUTSIDE the referenced
 * element. Classic use: closing a modal, dropdown, or popover.
 *
 * Notes for the interview:
 * - We keep `handler` in a ref so we don't re-attach the listener on every
 *   render (the handler is often an inline arrow function).
 * - We listen on "mousedown"/"touchstart" rather than "click" so the menu
 *   closes before a click on another control activates it.
 */
export function useOnClickOutside<T extends HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void
) {
  const ref = useRef<T>(null);
  const savedHandler = useRef(handler);
  savedHandler.current = handler;

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      savedHandler.current(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, []);

  return ref;
}
