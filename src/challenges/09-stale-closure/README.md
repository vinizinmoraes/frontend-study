# 09 · The Stale Closure Bug

**Difficulty:** Medium · **Type:** 📖 Reference / teaching demo

## Prompt

> Here's a counter that should increment every second. It freezes at 1. Why?
> Fix it three different ways.

This is a **favourite trick question**. If you understand it, you understand how
hooks and closures interact — which is the heart of React.

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount(count + 1), 1000);
    return () => clearInterval(id);
  }, []); // 👈
  return <h1>{count}</h1>;
}
```

## Why it freezes at 1

The effect runs **once** (empty deps). The interval callback **closes over**
`count` from that first render, where `count === 0`. Every tick computes
`setCount(0 + 1)` → `1`, forever. The closure is "stale": it never sees newer
values of `count`.

## The three fixes (all in the demo)

1. **Functional update** — `setCount(c => c + 1)`. Doesn't read `count` from the
   closure at all; React gives you the latest. ✅ Preferred.
2. **Ref holds latest value** — keep `countRef.current = count` fresh each render
   and read `countRef.current` in the callback. ✅ Use when you must *read* live
   state inside a long-lived callback.
3. **Add `count` to deps** — re-create the interval each second. Works, but
   tears down/sets up the timer constantly; usually the wrong tool here.

## Follow-up questions to rehearse

1. What is a closure, and why do hooks create one per render?
2. When would the ref approach be necessary over the functional update? → When
   you need to *read* the current value (e.g. inside an event handler attached
   once), not just transform the previous one.
3. How does the lint rule `react-hooks/exhaustive-deps` relate to this bug?
4. Why is `useInterval` (see `src/hooks/useInterval.ts`) a clean general fix?

## Takeaway

> Every render has its own props, state, and **its own** event handlers and
> effects — each capturing the values from that render. Stale-closure bugs come
> from a long-lived callback holding onto an old render's values.
