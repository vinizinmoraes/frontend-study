# 12 · Performance: memo / useCallback / useMemo

**Difficulty:** Medium · **Type:** 📖 Reference / teaching demo

## Prompt

> This parent re-renders on every keystroke. Some children re-render even though
> their data didn't change. Explain why, and fix it with the right tools.

Performance questions separate people who *cached everything in `useMemo`
because it felt safe* from people who understand **what actually causes
re-renders**.

## Try the demo

Toggle **Optimized** and type in the input, watching the render counters:

- **Off:** typing re-renders the parent, and the button child re-renders too —
  because its `onClick` prop is a brand-new function every render, and the
  expensive calculation runs every render.
- **On:** `React.memo` + `useCallback` keep the button from re-rendering, and
  `useMemo` skips the expensive recompute.

## The three tools

| Tool | What it memoizes | Use when |
| --- | --- | --- |
| `React.memo(Component)` | the rendered output | a child re-renders with the same props |
| `useCallback(fn, deps)` | a **function identity** | passing a callback to a memoized child / effect dep |
| `useMemo(fn, deps)` | a **computed value/object** | expensive calc, or a stable object/array reference |

Key insight: `useCallback` and `useMemo` are useless on their own — they only
pay off when something **downstream compares by reference** (a `memo` child, an
effect's dependency array, etc.).

## What the interviewer is testing

- Do you know **why** a child re-renders? → Its parent rendered, OR its props/
  state/context changed. New inline function = new prop = `memo` busts.
- Do you know memoization **isn't free**? It costs memory + a deps comparison.
  Over-memoizing is a real anti-pattern.
- Can you **measure** before optimizing? (React DevTools Profiler.)

## Follow-up questions to rehearse

1. What triggers a re-render in React?
2. Why doesn't `React.memo` help if you pass a new object/array/function each
   render? → Default shallow prop comparison sees a new reference.
3. When is `useMemo` the *wrong* choice? → Cheap computations; the comparison
   can cost more than the work.
4. How does **React Compiler** (React 19) change this? → It auto-memoizes, so
   manual `memo`/`useCallback`/`useMemo` become largely unnecessary.
5. Other perf levers: list **virtualization**, code-splitting / lazy, moving
   state down, `key` stability.

## Stretch goals

- Profile with the React DevTools Profiler and compare flame graphs.
- Add a large list and virtualize it.
- Demonstrate `useMemo` for a stable object passed through Context.
