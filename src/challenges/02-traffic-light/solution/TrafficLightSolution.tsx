import { useEffect, useState } from "react";

/**
 * SOLUTION for 02 · Traffic Light.
 *
 * The core pattern: one effect that depends on `active`. Each time the light
 * changes, the effect schedules the NEXT transition and the cleanup clears the
 * pending timeout. The state machine lives in two lookup tables, so adding a
 * state (e.g. red+yellow like German lights) means touching data, not logic.
 *
 * Includes the Pause/Resume stretch goal. Note the trade-off: pausing cancels
 * the pending timeout, and resuming restarts the CURRENT light's full duration
 * (we don't track remaining time). Remembering remaining time would need a
 * timestamp captured when the timeout was scheduled — a good follow-up to try.
 */

type Light = "red" | "yellow" | "green";

const DURATIONS: Record<Light, number> = { red: 4000, green: 3000, yellow: 1000 };
const NEXT: Record<Light, Light> = { red: "green", green: "yellow", yellow: "red" };

export default function TrafficLightSolution() {
  const [active, setActive] = useState<Light>("red");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setActive(NEXT[active]), DURATIONS[active]);
    return () => clearTimeout(id);
  }, [active, paused]);

  return (
    <div>
      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          gap: 12,
          padding: 16,
          background: "#000",
          borderRadius: 16,
        }}
      >
        {(["red", "yellow", "green"] as Light[]).map((light) => (
          <div
            key={light}
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background:
                active === light ? `var(--${light})` : "rgba(255,255,255,0.08)",
              boxShadow: active === light ? `0 0 24px var(--${light})` : "none",
              transition: "all 0.2s",
            }}
          />
        ))}
      </div>

      <div className="row" style={{ marginTop: 16 }}>
        <button className="btn secondary" onClick={() => setPaused((p) => !p)}>
          {paused ? "▶ Resume" : "⏸ Pause"}
        </button>
        <span className="hint">
          {active} for {DURATIONS[active] / 1000}s{paused && " (paused)"}
        </span>
      </div>
    </div>
  );
}
