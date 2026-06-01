import { useState } from "react";

/**
 * STARTER — your turn. See README.md.
 *
 * Build a 5-star rating. Hovering previews the rating; clicking commits it.
 * Then make it keyboard accessible (arrow keys + radiogroup semantics).
 */

interface StarRatingProps {
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
}

export default function StarRating({ max = 5 }: StarRatingProps) {
  const [value, setValue] = useState(0);
  // TODO 1: add `hover` state (number | null). Show `hover ?? value` filled.
  // const [hover, setHover] = useState<number | null>(null);

  // TODO 2: onMouseEnter set hover, onMouseLeave clear it, onClick commit value
  //   (and call onChange).
  // TODO 3: accessibility — wrap in role="radiogroup"; each star is a
  //   role="radio" with aria-checked, reachable by Tab, and ArrowLeft/ArrowRight
  //   change the rating.

  const display = value; // ← replace with `hover ?? value`

  return (
    <div>
      <p className="todo-note">
        ✍️ <strong>Your turn.</strong> Add hover-preview, click-to-commit, and
        keyboard support. The hover/commit split (show <code>hover ?? value</code>)
        and the a11y are what's being tested. Spec in <code>README.md</code>.
      </p>

      <div className="row" style={{ marginTop: 16, fontSize: 36 }} role="radiogroup" aria-label="Rating">
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
          <span
            key={star}
            style={{ cursor: "pointer", color: star <= display ? "var(--yellow)" : "var(--border)" }}
            // TODO: onMouseEnter / onMouseLeave / onClick handlers here
          >
            ★
          </span>
        ))}
        <span style={{ fontSize: 16, color: "var(--muted)", marginLeft: 12 }}>
          {value > 0 ? `${value} / ${max}` : "unrated"}
        </span>
      </div>
    </div>
  );
}
