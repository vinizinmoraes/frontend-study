import { useState } from "react";

/**
 * SOLUTION for 07 · Star Rating.
 *
 * The two-state split is the core idea:
 * - `value`  = committed rating (survives mouse leave)
 * - `hover`  = transient preview (null when the mouse is outside)
 * - displayed = hover ?? value
 *
 * Accessibility: a rating is semantically "pick one of N" → radiogroup/radio.
 * Roving tabindex: only the selected star (or the first, if unrated) is in the
 * tab order; ArrowLeft/ArrowRight move the rating. This matches the WAI-ARIA
 * radio group pattern, so screen readers announce "3 of 5, radio button".
 */

interface StarRatingProps {
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
}

export default function StarRatingSolution({
  max = 5,
  value: controlledValue,
  onChange,
}: StarRatingProps) {
  // Support controlled (value prop) and uncontrolled (internal state) usage.
  const [internalValue, setInternalValue] = useState(0);
  const value = controlledValue ?? internalValue;

  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;

  function commit(next: number) {
    setInternalValue(next);
    onChange?.(next);
  }

  function onKeyDown(e: React.KeyboardEvent, star: number) {
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next = Math.min(max, star + 1);
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = Math.max(1, star - 1);
    if (e.key === " " || e.key === "Enter") next = star;
    if (next === null) return;
    e.preventDefault();
    commit(next);
    // Move focus along with the selection (roving tabindex).
    const group = e.currentTarget.parentElement;
    (group?.children[next - 1] as HTMLElement | undefined)?.focus();
  }

  return (
    <div>
      <div
        className="row"
        style={{ fontSize: 36, gap: 4 }}
        role="radiogroup"
        aria-label="Rating"
        onMouseLeave={() => setHover(null)}
      >
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
          <span
            key={star}
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} of ${max}`}
            // Roving tabindex: one tab stop for the whole group.
            tabIndex={star === (value || 1) ? 0 : -1}
            onMouseEnter={() => setHover(star)}
            onClick={() => commit(star)}
            onKeyDown={(e) => onKeyDown(e, star)}
            style={{
              cursor: "pointer",
              color: star <= display ? "var(--yellow)" : "var(--border)",
              outlineOffset: 2,
            }}
          >
            ★
          </span>
        ))}
        <span style={{ fontSize: 16, color: "var(--muted)", marginLeft: 12 }}>
          {value > 0 ? `${value} / ${max}` : "unrated"}
        </span>
      </div>
      <p className="hint" style={{ marginTop: 10 }}>
        Try it with the keyboard: Tab to focus, arrow keys to change.
      </p>
    </div>
  );
}
