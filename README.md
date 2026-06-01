# 🧪 Frontend Study — React Interview Challenges

A growing collection of small, self-contained React projects for **senior
frontend interview prep**. Each one drills a pattern that shows up in real
interviews — timers, debouncing, data fetching, custom hooks, accessibility,
closures, and more.

Everything lives in **one runnable app**. Start the dev server and pick a
challenge from the sidebar.

## Getting started

```bash
npm install
npm run dev      # open the printed http://localhost:5173 URL
```

Other scripts:

```bash
npm run build      # type-check + production build
npm run typecheck  # types only
```

Stack: **React 18 + TypeScript + Vite**. No router or UI library — kept minimal
on purpose so the focus is React, not config.

## How to use this repo

Each challenge has two flavours:

| Badge | Meaning |
| --- | --- |
| 📖 **Reference solution** | Fully implemented. Read it, run it, understand *why*, then close it and rebuild from scratch. |
| ✍️ **Your turn** | A starter with `TODO`s. Implement it against the spec in that folder's `README.md`. |

> 💡 The real value is in the **per-challenge `README.md`** files. Each is written
> like an interview prompt: requirements, the gotchas the interviewer is probing
> for, follow-up questions to rehearse out loud, and stretch goals.

A good loop:

1. Read the challenge README. Try to **explain the approach out loud** first
   (interviews are verbal).
2. Implement it (or, for reference ones, read then rebuild).
3. Do the **follow-up questions** — these are where seniors are made or broken.
4. Attempt a stretch goal.

## The challenges

| # | Challenge | Difficulty | Focus |
| --- | --- | --- | --- |
| 01 | Stopwatch / Timer | Easy | `setInterval`, `useRef`, cleanup, drift |
| 02 | Traffic Light | Easy | state machine, `setTimeout`, effects |
| 03 | Debounced Search | Hard | debounce, fetch, **race conditions**, `AbortController` |
| 04 | useFetch hook | Medium | custom hooks, loading/error, generics |
| 05 | Todo List + Filters | Easy | `useState`, immutable updates, derived state, `localStorage` |
| 06 | Accordion | Medium | controlled/uncontrolled, a11y, ARIA |
| 07 | Star Rating | Medium | hover vs committed state, keyboard a11y |
| 08 | Infinite Scroll | Hard | `IntersectionObserver`, pagination, refs |
| 09 | The Stale Closure Bug | Medium | closures, effect deps, functional updates |
| 10 | Form Validation | Medium | controlled inputs, validation, touched/blur, async submit |
| 11 | Modal / Dialog | Hard | portals, **focus trap**, a11y, Esc / scroll lock |
| 12 | Performance | Medium | `React.memo`, `useCallback`, `useMemo`, re-renders |

## Shared hooks (`src/hooks/`)

Reusable hooks the challenges build on — study these patterns:

- `useInterval` — declarative `setInterval` that avoids stale closures.
- `useDebounce` — debounce any value with `setTimeout` + cleanup.
- `useLocalStorage` — `useState` that persists, with lazy init + safe parsing.
- `useOnClickOutside` — detect clicks outside an element (menus, popovers).

## Roadmap / ideas to add next

Themes worth building once you've cleared the above:

- **Tabs / Carousel:** keyboard nav, ARIA, roving tabindex.
- **List virtualization:** render only visible rows for a 10k-item list.
- **`useReducer`:** rebuild the todo app with a reducer; a tiny shopping cart.
- **Context:** a theme switcher; avoiding unnecessary re-renders.
- **Promises / async:** `Promise.all`, a retry-with-backoff helper, polling.
- **Vanilla JS classics:** implement `debounce`/`throttle`/`memoize`/`curry`,
  deep clone, event emitter — frequent live-coding warmups.
- **Data viz from scratch:** a small bar chart, a progress ring.

> Want me to scaffold any of these? Just ask — the structure mirrors the
> existing challenges, so new ones drop into `src/challenges/` and register in
> `src/challenges/registry.tsx`.
```
src/challenges/NN-name/
  Component.tsx     # the challenge
  README.md         # the spec / interview prompt
```
```

## Interview tips baked into these

- **Always handle loading + error + empty states** — not just the happy path.
- **Clean up** every timer, subscription, and request (effect cleanup).
- **Updates are immutable**; derive state during render instead of duplicating it.
- **Cancel stale async work** (`AbortController`) to dodge race conditions.
- **Reach for accessibility** (`<button>`, ARIA roles, keyboard) unprompted.
- **Talk while you code** — interviewers grade your reasoning, not just the result.

Happy studying. 🚀
