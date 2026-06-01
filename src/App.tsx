import { useEffect, useState } from "react";
import { challenges, getChallenge } from "./challenges/registry";

/**
 * Tiny hash-based router so we avoid an external dependency.
 * URL looks like:  /#/03-debounced-search
 */
function useHashRoute(): [string | null, (id: string | null) => void] {
  const parse = () => window.location.hash.replace(/^#\/?/, "") || null;
  const [route, setRoute] = useState<string | null>(parse);

  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const navigate = (id: string | null) => {
    window.location.hash = id ? `/${id}` : "/";
  };

  return [route, navigate];
}

export default function App() {
  const [route, navigate] = useHashRoute();
  const active = getChallenge(route);

  return (
    <div className="layout">
      <aside className="sidebar">
        <button className="brand" onClick={() => navigate(null)}>
          🧪 Frontend Study
        </button>
        <p className="brand-sub">React interview challenges</p>
        <nav>
          {challenges.map((c) => (
            <button
              key={c.id}
              className={`nav-item ${active?.id === c.id ? "is-active" : ""}`}
              onClick={() => navigate(c.id)}
            >
              <span className="nav-title">{c.title}</span>
              <span className={`badge badge-${c.difficulty.toLowerCase()}`}>
                {c.difficulty}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="content">
        {active ? <ChallengeView key={active.id} /> : <Home />}
      </main>
    </div>
  );

  function ChallengeView() {
    const c = active!;
    const Component = c.component;
    return (
      <article>
        <header className="challenge-header">
          <div className="challenge-meta">
            <span className={`badge badge-${c.difficulty.toLowerCase()}`}>
              {c.difficulty}
            </span>
            <span className={`badge badge-${c.kind}`}>
              {c.kind === "reference" ? "📖 Reference solution" : "✍️ Your turn"}
            </span>
            {c.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          <h1>{c.title}</h1>
          <p className="challenge-summary">{c.summary}</p>
          <p className="hint">
            📄 Full spec &amp; talking points:{" "}
            <code>src/challenges/{c.id}/README.md</code>
          </p>
        </header>
        <section className="demo">
          <Component />
        </section>
      </article>
    );
  }
}

function Home() {
  return (
    <div className="home">
      <h1>React Interview Challenges</h1>
      <p>
        A set of small, self-contained projects to drill the patterns that come
        up in senior frontend interviews. Pick one from the sidebar.
      </p>
      <ul className="legend">
        <li>
          <span className="badge badge-reference">📖 Reference solution</span>{" "}
          — fully implemented. Read it, run it, then try to rebuild it from
          scratch without looking.
        </li>
        <li>
          <span className="badge badge-starter">✍️ Your turn</span> — a starter
          with TODOs. Open the folder's <code>README.md</code> for the spec.
        </li>
      </ul>
      <p className="hint">
        Each challenge folder under <code>src/challenges/</code> has a README
        written like a real interview prompt: requirements, follow-up questions,
        and the gotchas interviewers probe for.
      </p>
    </div>
  );
}
