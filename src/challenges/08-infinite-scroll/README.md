# 08 · Infinite Scroll

**Difficulty:** Hard · **Type:** ✍️ Your turn

> 🔑 **Stuck or done?** A worked solution lives in this folder's `solution/` directory — also viewable in the app via the "Solution" tab. Try it yourself first; reading the answer before struggling defeats the drill.

## Prompt

> Render a long, paginated list. As the user scrolls near the bottom, load the
> next page automatically, until there are none left.

## Requirements

- [ ] Load the first page on mount.
- [ ] Auto-load the next page when the bottom comes into view.
- [ ] Use **`IntersectionObserver`**, not a `scroll` event listener.
- [ ] Don't fire **duplicate** requests (guard with `loading`).
- [ ] Stop when there's no more data and show a "done" message.

## Why IntersectionObserver over scroll events

`scroll` fires constantly and forces you to read layout (`scrollTop`,
`offsetHeight`) on every event — janky, and you must throttle it.
`IntersectionObserver` tells you when an element enters the viewport,
asynchronously and off the main thread. Mentioning this trade-off is the senior
signal.

## What the interviewer is testing

- Knowledge of `IntersectionObserver` and cleaning it up (`disconnect`).
- **Avoiding duplicate fetches** — the observer can fire repeatedly while the
  sentinel is visible; gate on `loading`/`hasMore`.
- Effect dependencies and refs: re-observing correctly when state changes.

## Hints

- Render a **sentinel** `<div ref={sentinelRef} />` at the bottom of the list.
- In an effect, `new IntersectionObserver(cb)`, `observe(sentinel)`, and
  `disconnect()` in cleanup.
- In the callback: `if (entry.isIntersecting && !loading && hasMore)
  setPage(p => p + 1)`.

## Follow-up questions to rehearse

1. Why not a scroll listener? (see above)
2. How do you prevent double-loading the same page?
3. How would you **virtualise** the list so 10,000 rows don't kill the DOM? →
   render only visible rows (react-window / react-virtual).
4. How do you handle a failed page load with retry?

## Stretch goals

- Add windowing/virtualization.
- Preserve scroll position when navigating away and back.
- Error + retry state.
