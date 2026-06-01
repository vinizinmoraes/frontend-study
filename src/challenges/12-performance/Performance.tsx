import { memo, useCallback, useMemo, useRef, useState } from "react";

/**
 * REFERENCE / TEACHING DEMO — React.memo, useCallback, useMemo.
 *
 * Flip the "Optimized" switch and watch the render counters. Typing in the box
 * re-renders the parent on every keystroke; the question is which CHILDREN
 * re-render needlessly, and how memoization stops that.
 */
export default function Performance() {
  const [optimized, setOptimized] = useState(false);
  return (
    <div>
      <label className="row" style={{ gap: 8, marginBottom: 16 }}>
        <input
          type="checkbox"
          checked={optimized}
          onChange={(e) => setOptimized(e.target.checked)}
        />
        <span>
          Optimized ({optimized ? "memo + useCallback + useMemo" : "off"})
        </span>
      </label>
      {/* key remounts the tree so render counters reset when you toggle */}
      <Parent key={String(optimized)} optimized={optimized} />
    </div>
  );
}

function Parent({ optimized }: { optimized: boolean }) {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // The callback identity: a NEW function every render unless useCallback.
  const rawIncrement = () => setCount((c) => c + 1);
  const memoIncrement = useCallback(() => setCount((c) => c + 1), []);
  const increment = optimized ? memoIncrement : rawIncrement;

  // Expensive derived value: recomputed every render unless useMemo.
  const rawExpensive = slowDouble(count);
  const memoExpensive = useMemo(() => slowDouble(count), [count]);
  const expensive = optimized ? memoExpensive : rawExpensive;

  const ButtonChild = optimized ? MemoButton : PlainButton;

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <RenderBadge label="Parent" />

      <div className="row">
        <span>Count: {count}</span>
        <span className="hint">expensive(count) = {expensive}</span>
      </div>

      <input
        className="field"
        placeholder="Type here — this re-renders Parent every keystroke"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <ButtonChild onClick={increment} />
    </div>
  );
}

/* A child that only cares about onClick. With React.memo + a stable onClick it
   should NOT re-render when the parent re-renders due to unrelated `text`. */
function PlainButton({ onClick }: { onClick: () => void }) {
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 10, padding: 14 }}>
      <RenderBadge label="Button child (plain)" />
      <button className="btn" onClick={onClick} style={{ marginTop: 8 }}>
        +1
      </button>
    </div>
  );
}
const MemoButton = memo(function MemoButton({ onClick }: { onClick: () => void }) {
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 10, padding: 14 }}>
      <RenderBadge label="Button child (memo)" />
      <button className="btn" onClick={onClick} style={{ marginTop: 8 }}>
        +1
      </button>
    </div>
  );
});

/* Counts how many times this component instance has rendered. */
function RenderBadge({ label }: { label: string }) {
  const renders = useRef(0);
  renders.current += 1;
  return (
    <span className="hint">
      {label} renders: <strong style={{ color: "var(--accent)" }}>{renders.current}</strong>
    </span>
  );
}

// Pretend-expensive pure function so useMemo has something to skip.
function slowDouble(n: number): number {
  let x = 0;
  for (let i = 0; i < 2_000_000; i++) x += 1;
  return n * 2 + (x - 2_000_000);
}
