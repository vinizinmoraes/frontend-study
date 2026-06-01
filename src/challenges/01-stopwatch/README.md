# 01 · Stopwatch / Timer

**Difficulty:** Easy · **Type:** 📖 Reference solution

## Prompt

> Build a stopwatch with **Start**, **Stop**, and **Reset**. Display minutes,
> seconds, and centiseconds.

## What the interviewer is testing

- Do you clean up your timers? (memory leaks / "Warning: can't update state on
  an unmounted component")
- Do you understand that a timer id belongs in a **ref**, not in state? (Putting
  it in state causes needless re-renders and stale-id bugs.)
- Bonus senior signal: do you know `setInterval` **drifts** and compute elapsed
  time from timestamps instead of accumulating `+= 100`?

## Requirements

- [x] Start begins counting from the current time.
- [x] Stop freezes the display but preserves elapsed time.
- [x] Start again resumes from where it stopped.
- [x] Reset returns to `00:00.00`.
- [x] No leaked intervals when the component unmounts or pauses.

## Key ideas in the solution

- `useInterval(callback, delay)` — passing `delay = null` pauses the interval
  declaratively. See `src/hooks/useInterval.ts`.
- We store `startRef` (when we started) and `accumulatedRef` (time banked from
  previous runs). The displayed value is
  `accumulated + (Date.now() - start)` — drift-free.

## Follow-up questions to rehearse

1. Why not `setInterval(() => setElapsed(e => e + 50), 50)`? → Drift; intervals
   are throttled in background tabs.
2. What happens to a `setInterval` when you store its id in state and the
   component re-renders? → You may lose the reference and fail to clear it.
3. How would you make it keep counting accurately when the tab is backgrounded?
   → Recompute from `Date.now()` on visibility change.

## Stretch goals

- Add **lap** times.
- Add a keyboard shortcut (space = start/stop).
- Persist the running state across a page refresh.
