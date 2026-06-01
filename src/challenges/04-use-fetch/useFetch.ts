import { useEffect, useState } from "react";

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * REFERENCE: a small, typed data-fetching hook.
 *
 * Handles the four things people forget:
 *  - loading state
 *  - error state (including non-2xx responses, which `fetch` does NOT reject on)
 *  - cancellation on unmount / url change (no setState-after-unmount warning)
 *  - re-fetching when the url changes
 */
export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });

    fetch(url, { signal: controller.signal })
      .then(async (res) => {
        // fetch only rejects on network failure, NOT on 404/500 — check it.
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return (await res.json()) as T;
      })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err : new Error(String(err)),
        });
      });

    return () => controller.abort();
  }, [url]);

  return state;
}
