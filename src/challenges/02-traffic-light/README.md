# 02 · Traffic Light

**Difficulty:** Easy · **Type:** ✍️ Your turn

## Prompt

> Build a traffic light that cycles **red → green → yellow → red**
> automatically, where each colour stays on for a different duration.

A deceptively good question: it's a tiny **finite state machine** driven by
timers, and it exposes whether you handle effect cleanup correctly.

## Requirements

- [ ] Exactly one light is active at a time.
- [ ] Red 4s → Green 3s → Yellow 1s → back to Red (tune to taste).
- [ ] Transitions happen automatically on a timer.
- [ ] No leaked timers (cleanup on unmount and between transitions).

## Hints

- Model state as a single value: `type Light = "red" | "yellow" | "green"`.
- Keep two lookup maps: `DURATIONS[light]` and `NEXT[light]`.
- One `useEffect` that depends on `active`: schedule a `setTimeout` to move to
  `NEXT[active]`, and **clear it in the cleanup**. Because the effect re-runs
  whenever `active` changes, each colour schedules the next one.

## Follow-up questions to rehearse

1. Why does this work with `setTimeout` in an effect rather than one big
   `setInterval`? → Each state owns its own duration; the effect-per-state
   pattern is self-cleaning.
2. How would you add a **pedestrian button** that forces red at the next safe
   moment? (Now it's a real state machine.)
3. Could you model this with `useReducer`? What would the actions be?

## Stretch goals

- **Pause/Resume** button.
- A pedestrian "walk" request.
- Refactor to `useReducer` with a transition table.
