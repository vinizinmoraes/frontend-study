import { useEffect, useState } from "react";

/**
 * STARTER — your turn. See README.md.
 *
 * Load 20 items, and when a sentinel element scrolls into view, load the next
 * page — until there are no more. Use IntersectionObserver (not a scroll
 * listener) and don't fire duplicate fetches.
 */

const PAGE_SIZE = 20;
const TOTAL = 120;

// Fake paginated loader — resolves a page of items after a short delay.
function loadPage(page: number): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = page * PAGE_SIZE;
      const items = Array.from(
        { length: Math.min(PAGE_SIZE, TOTAL - start) },
        (_, i) => `Item #${start + i + 1}`
      );
      resolve(items);
    }, 600);
  });
}

export default function InfiniteScroll() {
  const [items, setItems] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const hasMore = items.length < TOTAL;

  // Load whenever `page` changes (page 0 on mount).
  useEffect(() => {
    setLoading(true);
    loadPage(page).then((next) => {
      setItems((prev) => [...prev, ...next]);
      setLoading(false);
    });
  }, [page]);

  // TODO 1: create a ref for a "sentinel" <div> rendered at the bottom of the list.
  // TODO 2: in a useEffect, attach an IntersectionObserver to the sentinel.
  //   When it becomes visible AND !loading AND hasMore → setPage(p => p + 1).
  //   Remember to observer.disconnect() in the cleanup, and re-create it when
  //   `loading`/`hasMore` change (or read them from refs to avoid re-creating).
  //
  // const sentinelRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   const el = sentinelRef.current;
  //   if (!el || !hasMore) return;
  //   const io = new IntersectionObserver(([entry]) => {
  //     if (entry.isIntersecting && !loading) setPage(p => p + 1);
  //   });
  //   io.observe(el);
  //   return () => io.disconnect();
  // }, [loading, hasMore]);

  return (
    <div>
      <p className="todo-note">
        ✍️ <strong>Your turn.</strong> Right now it only loads page 1. Add a
        sentinel <code>div</code> at the bottom and an{" "}
        <code>IntersectionObserver</code> that loads the next page when it
        scrolls into view — without double-firing. Spec in <code>README.md</code>.
      </p>

      <div
        style={{
          marginTop: 16,
          height: 320,
          overflowY: "auto",
          border: "1px solid var(--border)",
          borderRadius: 10,
        }}
      >
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {items.map((item) => (
            <li key={item} style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
              {item}
            </li>
          ))}
        </ul>

        {loading && <p className="hint" style={{ padding: 16 }}>Loading…</p>}
        {!hasMore && <p className="hint" style={{ padding: 16 }}>🎉 That's everything.</p>}

        {/* TODO: render <div ref={sentinelRef} /> here when hasMore */}

        {/* Temporary manual button — delete once the observer works */}
        {hasMore && !loading && (
          <button className="btn secondary" style={{ margin: 16 }} onClick={() => setPage((p) => p + 1)}>
            Load more (replace me with the observer)
          </button>
        )}
      </div>
    </div>
  );
}
