import { useState } from "react";

/**
 * STARTER — your turn. See README.md for the full spec.
 *
 * Goal: cycle the active light red → green → yellow → red on a timer, each
 * colour with its own duration (e.g. red 4s, green 3s, yellow 1s).
 */

type Light = "red" | "yellow" | "green";

// const DURATIONS: Record<Light, number> = { red: 4000, green: 3000, yellow: 1000 };
// const NEXT: Record<Light, Light> = { red: "green", green: "yellow", yellow: "red" };

export default function TrafficLight() {
  const [active] = useState<Light>("red");

  // TODO 1: advance `active` to the next light after DURATIONS[active] ms.
  //   Hint: a useEffect that depends on `active`, with a setTimeout, and a
  //   cleanup that clears the timeout. The effect re-runs each time `active`
  //   changes, scheduling the next transition.
  //
  // useEffect(() => {
  //   const id = setTimeout(() => setActive(NEXT[active]), DURATIONS[active]);
  //   return () => clearTimeout(id);
  // }, [active]);

  return (
    <div>
      <p className="todo-note">
        ✍️ <strong>Your turn.</strong> Make the lights cycle on a timer (red →
        green → yellow → red), each with its own duration. Then add a
        Pause/Resume button. Full spec in <code>README.md</code>.
      </p>

      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          gap: 12,
          padding: 16,
          background: "#000",
          borderRadius: 16,
          marginTop: 16,
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
              boxShadow:
                active === light ? `0 0 24px var(--${light})` : "none",
              transition: "all 0.2s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
