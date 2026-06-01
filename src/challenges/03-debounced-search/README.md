# 03 · Debounced Search (Autocomplete)

**Difficulty:** Hard · **Type:** 📖 Reference solution

## Prompt

> Build a search input that queries an API as the user types and shows results.
> Don't hammer the server, and make sure the results always match what's in the
> box.

This is one of the **most common senior frontend interview questions**. It looks
easy and has two traps that separate juniors from seniors.

## The two real problems

### 1. Debouncing

Firing a request on every keystroke is wasteful. Wait until the user pauses
(~300ms) before searching. Here we use a `useDebounce` hook, but be ready to
write debounce **from scratch** with `setTimeout` + cleanup.

### 2. Race conditions (the senior signal 🚨)

Even with debouncing, responses can arrive **out of order**. You type "ap"
(slow request) then "app" (fast request). "app" returns first, then the stale
"ap" response overwrites it. Now the box says "app" but shows results for "ap".

**Fix:** cancel the previous request whenever the query changes, using
`AbortController` in the effect cleanup. Each effect run owns exactly one
request; the cleanup aborts it before the next one starts.

```ts
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal })...;
  return () => controller.abort(); // ← cancels the stale request
}, [debouncedQuery]);
```

> Try it in the demo: type quickly. Without the abort logic you'd see flicker
> and wrong results because `fakeApi` uses random latency.

## Requirements

- [x] Debounce input (no request per keystroke).
- [x] Loading / empty / error states.
- [x] Stale responses never overwrite fresh ones.
- [x] Ignore the `AbortError` thrown by a cancelled request.

## Follow-up questions to rehearse

1. Two ways to solve the race condition? → (a) `AbortController`, (b) an
   "ignore" flag / request-id check in the cleanup closure.
2. Where should debounce live — the value or the effect? → Either; debouncing
   the value keeps the effect simple.
3. How do you cache results so re-typing a query is instant? → Map of
   query→results, or a library like React Query / SWR.
4. Keyboard navigation + ARIA combobox roles for accessibility?

## Stretch goals

- Arrow-key navigation and Enter to select.
- Highlight the matching substring.
- Add an in-memory cache.
