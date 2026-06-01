import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { AbortError, searchFruits } from "./fakeApi";

/**
 * REFERENCE SOLUTION.
 *
 * Two separate problems get conflated in interviews:
 *
 * 1. DEBOUNCE — don't fire a request on every keystroke. We debounce the query
 *    so we only search after the user pauses (see useDebounce).
 *
 * 2. RACE CONDITIONS — even debounced, request A can resolve AFTER request B
 *    that was fired later, leaving stale results on screen. We fix this by
 *    aborting the previous request in the effect cleanup. Each render owns one
 *    request; when the query changes, the old one is cancelled.
 */
export default function DebouncedSearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 350);

  const [results, setResults] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setResults([]);
      setStatus("idle");
      return;
    }

    const controller = new AbortController();
    setStatus("loading");

    searchFruits(debouncedQuery, controller.signal)
      .then((data) => {
        setResults(data);
        setStatus("done");
      })
      .catch((err) => {
        // An aborted request is expected — ignore it, don't show an error.
        if (err instanceof AbortError) return;
        setStatus("error");
      });

    // Cleanup runs when debouncedQuery changes or the component unmounts.
    return () => controller.abort();
  }, [debouncedQuery]);

  return (
    <div>
      <input
        className="field"
        placeholder="Search fruits… (try typing fast)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />

      <div style={{ marginTop: 14, minHeight: 24 }}>
        {status === "loading" && <span className="hint">Searching…</span>}
        {status === "error" && (
          <span style={{ color: "var(--red)" }}>Something went wrong.</span>
        )}
        {status === "done" && results.length === 0 && (
          <span className="hint">No matches for “{debouncedQuery}”.</span>
        )}
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {results.map((r) => (
          <li
            key={r}
            style={{
              padding: "8px 10px",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}
