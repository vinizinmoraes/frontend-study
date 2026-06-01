import { useState } from "react";

/**
 * STARTER — your turn. See README.md.
 *
 * Build an accordion: clicking a header expands its panel. Support "single
 * open" (opening one closes others) AND keyboard + ARIA accessibility.
 */

interface Item {
  id: string;
  title: string;
  body: string;
}

const ITEMS: Item[] = [
  { id: "a", title: "What is a controlled component?", body: "One whose value is driven by React state via props." },
  { id: "b", title: "What is reconciliation?", body: "React's diffing of the new element tree against the previous one." },
  { id: "c", title: "When does useMemo help?", body: "To skip expensive recomputation, or to keep a stable reference identity." },
];

export default function Accordion() {
  // TODO: track which panel(s) are open. For "single open" a string|null works;
  // for "multi open" use a Set<string>.
  const [openId] = useState<string | null>("a");

  // TODO 1: toggle(id) — open the clicked panel, close it if already open.
  // TODO 2: for single-open mode, opening one closes the others.
  // TODO 3: accessibility — the header should be a <button> with
  //   aria-expanded and aria-controls; the panel needs a matching id and
  //   role="region". Buttons already give you Enter/Space for free.

  return (
    <div>
      <p className="todo-note">
        ✍️ <strong>Your turn.</strong> Wire up expand/collapse, then make it a
        proper single-open accordion with <code>aria-expanded</code>/
        <code>aria-controls</code>. The a11y is the real test. Spec in{" "}
        <code>README.md</code>.
      </p>

      <div style={{ marginTop: 16, border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
        {ITEMS.map((item) => {
          const isOpen = openId === item.id; // ← replace with your logic
          return (
            <div key={item.id} style={{ borderBottom: "1px solid var(--border)" }}>
              <button
                className="row"
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                  background: "var(--panel-2)",
                  border: "none",
                  color: "var(--text)",
                  padding: "14px 16px",
                  cursor: "pointer",
                  fontSize: 15,
                }}
                // TODO: onClick={() => toggle(item.id)} aria-expanded={isOpen}
              >
                <span>{item.title}</span>
                <span>{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div style={{ padding: "14px 16px", color: "var(--muted)", lineHeight: 1.6 }}>
                  {item.body}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
