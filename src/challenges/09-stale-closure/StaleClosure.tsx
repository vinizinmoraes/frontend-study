import { useEffect, useRef, useState } from "react";

/**
 * REFERENCE / TEACHING DEMO.
 *
 * Three counters that tick every second. The first one is BUGGY — it freezes
 * at 1. The other two fix it. Watch them run and read why.
 */
export default function StaleClosure() {
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <BuggyCounter />
      <FunctionalUpdateCounter />
      <RefCounter />
      <p className="hint" style={{ marginTop: 8 }}>
        Open <code>StaleClosure.tsx</code> to read the explanations inline.
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- */

function Card({
  title,
  value,
  tone,
  children,
}: {
  title: string;
  value: number;
  tone: "bad" | "good";
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: 16,
        background: "var(--panel-2)",
      }}
    >
      <div className="row" style={{ justifyContent: "space-between" }}>
        <strong>{title}</strong>
        <span
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: tone === "bad" ? "var(--red)" : "var(--green)",
          }}
        >
          {value}
        </span>
      </div>
      <p className="hint" style={{ margin: "8px 0 0" }}>
        {children}
      </p>
    </div>
  );
}

// ❌ THE BUG: the effect runs once (empty deps). The interval callback closes
// over `count` from that FIRST render, where count === 0. So every tick computes
// setCount(0 + 1) === 1 forever. It's "stale" because the closure never sees new
// values of count.
function BuggyCounter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount(count + 1), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ← empty deps freeze `count` at 0
  return (
    <Card title="❌ Buggy (freezes at 1)" value={count} tone="bad">
      Empty deps → the callback forever closes over the initial{" "}
      <code>count = 0</code>, so it always sets 1.
    </Card>
  );
}

// ✅ FIX 1: functional update. setCount(c => c + 1) doesn't read `count` from the
// closure at all — React hands you the latest value. The effect can stay
// mount-once and still be correct.
function FunctionalUpdateCounter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <Card title="✅ Functional update" value={count} tone="good">
      <code>setCount(c =&gt; c + 1)</code> ignores the stale closure — React
      passes the current value. Preferred fix.
    </Card>
  );
}

// ✅ FIX 2: a ref that always holds the latest value. Useful when you need to
// READ the latest state inside a long-lived callback (not just increment it).
function RefCounter() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  countRef.current = count; // updated every render
  useEffect(() => {
    const id = setInterval(() => setCount(countRef.current + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <Card title="✅ Ref holds latest value" value={count} tone="good">
      A <code>ref</code> is mutable and shared across renders, so the callback
      reads the current value. Handy when you need to <em>read</em> live state.
    </Card>
  );
}
