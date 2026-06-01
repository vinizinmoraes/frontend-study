import { useState } from "react";
import { useFetch } from "./useFetch";

interface Post {
  id: number;
  title: string;
  body: string;
}

/**
 * REFERENCE SOLUTION.
 *
 * Demonstrates the useFetch hook. Changing the post id re-runs the fetch and
 * cancels any in-flight request. (Uses the public jsonplaceholder API — needs
 * network. If you're offline you'll see the error state, which is the point:
 * the hook handles it gracefully.)
 */
export default function UseFetchDemo() {
  const [id, setId] = useState(1);
  const { data, loading, error } = useFetch<Post>(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  return (
    <div>
      <div className="row" style={{ marginBottom: 16 }}>
        <button
          className="btn secondary"
          onClick={() => setId((n) => Math.max(1, n - 1))}
          disabled={id <= 1}
        >
          ← Prev
        </button>
        <span>Post #{id}</span>
        <button
          className="btn secondary"
          onClick={() => setId((n) => Math.min(100, n + 1))}
          disabled={id >= 100}
        >
          Next →
        </button>
      </div>

      {loading && <p className="hint">Loading…</p>}
      {error && (
        <p style={{ color: "var(--red)" }}>
          Failed to load: {error.message} (are you online?)
        </p>
      )}
      {data && !loading && (
        <div>
          <h3 style={{ marginTop: 0, textTransform: "capitalize" }}>
            {data.title}
          </h3>
          <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>{data.body}</p>
        </div>
      )}
    </div>
  );
}
