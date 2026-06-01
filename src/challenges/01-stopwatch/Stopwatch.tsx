import { useRef, useState } from "react";
import { useInterval } from "../../hooks/useInterval";

/**
 * REFERENCE SOLUTION.
 *
 * Common mistake: incrementing `elapsed += 100` on every tick. setInterval is
 * not precise and drifts, so the clock slowly becomes wrong. The robust
 * approach is to remember WHEN we started (a timestamp) and compute elapsed time
 * from `Date.now()`. The interval is then just a "please re-render" signal.
 */
export default function Stopwatch() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0); // ms

  // Timestamp captured when the stopwatch was (re)started.
  const startRef = useRef(0);
  // Elapsed time accumulated across previous start/stop cycles.
  const accumulatedRef = useRef(0);

  // Tick ~every 50ms while running; null pauses the interval.
  useInterval(
    () => setElapsed(accumulatedRef.current + (Date.now() - startRef.current)),
    running ? 50 : null
  );

  function start() {
    startRef.current = Date.now();
    setRunning(true);
  }

  function stop() {
    accumulatedRef.current += Date.now() - startRef.current;
    setRunning(false);
  }

  function reset() {
    accumulatedRef.current = 0;
    startRef.current = Date.now();
    setElapsed(0);
  }

  return (
    <div>
      <div
        style={{
          fontSize: 48,
          fontVariantNumeric: "tabular-nums",
          fontWeight: 700,
          letterSpacing: 1,
          marginBottom: 20,
        }}
      >
        {format(elapsed)}
      </div>
      <div className="row">
        {!running ? (
          <button className="btn" onClick={start}>
            Start
          </button>
        ) : (
          <button className="btn" onClick={stop}>
            Stop
          </button>
        )}
        <button className="btn secondary" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

function format(ms: number): string {
  const totalCs = Math.floor(ms / 10); // centiseconds
  const cs = totalCs % 100;
  const totalSeconds = Math.floor(totalCs / 100);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(minutes)}:${pad(seconds)}.${pad(cs)}`;
}
