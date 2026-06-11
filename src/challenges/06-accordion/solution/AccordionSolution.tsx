import { useState } from "react";

/**
 * SOLUTION for 06 · Accordion (single-open).
 *
 * State shape is the whole trick: single-open = `openId: string | null`.
 * Toggling an open panel closes it (set to null); opening another one
 * implicitly closes the previous because there's only one slot.
 * (Multi-open would be a Set<string> and toggle = add/delete.)
 *
 * Accessibility checklist applied here:
 * - The header is a real <button> → focusable + Enter/Space for free.
 * - aria-expanded on the button tells screen readers the state.
 * - aria-controls / id pair links the button to its panel.
 * - The panel is role="region" with aria-labelledby back to the header, so a
 *   screen-reader user landing in the content knows which section it belongs to.
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

export default function AccordionSolution() {
  const [openId, setOpenId] = useState<string | null>("a");

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      {ITEMS.map((item) => {
        const isOpen = openId === item.id;
        const headerId = `accordion-header-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;
        return (
          <div key={item.id} style={{ borderBottom: "1px solid var(--border)" }}>
            <button
              id={headerId}
              className="row"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
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
            >
              <span>{item.title}</span>
              <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                style={{ padding: "14px 16px", color: "var(--muted)", lineHeight: 1.6 }}
              >
                {item.body}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
