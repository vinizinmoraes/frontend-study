import { useEffect, useRef, useState } from "react";

/**
 * SOLUTION for 08 · Infinite Scroll.
 *
 * Moving parts:
 * - A sentinel <div> rendered after the list (only while hasMore).
 * - An IntersectionObserver watching it, with `root` set to the scroll
 *   container so intersection is measured against the container, not the
 *   window.
 * - Duplicate-fetch guard: the effect re-runs when `loading` flips, so while a
 *   page is loading either the sentinel isn't observed at all (we return early)
 *   — the observer can't double-fire.
 * - The observer is disconnect()ed in the cleanup, and naturally stops when
 *   hasMore becomes false because the sentinel unmounts.
 */

const PAGE_SIZE = 20;
const TOTAL = 120;

function loadPage(page: number): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = page * PAGE_SIZE;
      resolve(
        Array.from(
          { length: Math.min(PAGE_SIZE, TOTAL - start) },
          (_, i) => `Item #${start + i + 1}`
        )
      );
    }, 600);
  });
}

export default function InfiniteScrollSolution() {
  const [items, setItems] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const hasMore = items.length < TOTAL;

  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    loadPage(page).then((next) => {
      setItems((prev) => [...prev, ...next]);
      setLoading(false);
    });
  }, [page]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    // While loading (or when done) we simply don't observe — that's the
    // duplicate-fetch guard. When loading flips back to false this effect
    // re-runs and re-arms the observer.
    if (!sentinel || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPage((p) => p + 1);
      },
      // Observe within the scroll container; start loading a little early.
      { root: containerRef.current, rootMargin: "100px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loading, hasMore]);

  return (
    <div
      ref={containerRef}
      style={{
        height: 320,
        overflowY: "auto",
        border: "1px solid var(--border)",
        borderRadius: 10,
      }}
    >
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item) => (
          <li
            key={item}
            style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}
          >
            {item}
          </li>
        ))}
      </ul>

      {loading && (
        <p className="hint" style={{ padding: 16 }}>
          Loading…
        </p>
      )}
      {!hasMore && (
        <p className="hint" style={{ padding: 16 }}>
          🎉 That's everything ({TOTAL} items).
        </p>
      )}

      {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
    </div>
  );
}
