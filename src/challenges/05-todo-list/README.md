# 05 · Todo List + Filters

**Difficulty:** Easy · **Type:** ✍️ Your turn

> 🔑 **Stuck or done?** A worked solution lives in this folder's `solution/` directory — also viewable in the app via the "Solution" tab. Try it yourself first; reading the answer before struggling defeats the drill.

## Prompt

> Build a todo app: add, toggle complete, delete, and filter by
> All / Active / Completed. Persist across page refreshes.

The "hello world" of frontend interviews — but it's a vehicle for several real
principles. Do it cleanly.

## Requirements

- [ ] Add a todo (Enter or a button). Ignore empty input.
- [ ] Toggle a todo's completed state.
- [ ] Delete a todo.
- [ ] Filter: All / Active / Completed.
- [ ] "N items left" counter and "Clear completed".
- [ ] Persist to `localStorage` (use the provided `useLocalStorage` hook).

## What the interviewer is testing

- **Immutable updates.** Never mutate state. Use `map`/`filter`/spread:
  `todos.map(t => t.id === id ? { ...t, done: !t.done } : t)`.
- **Derived vs. stored state.** The filtered list is *computed during render*
  from `todos` + `filter`. Storing it in its own state is a classic mistake that
  leads to them getting out of sync.
- **Stable keys.** Use a real id (`crypto.randomUUID()`), not the array index.
- **Controlled inputs.**

## Follow-up questions to rehearse

1. Why is the index a bad `key`? → Reordering/deleting causes React to reuse the
   wrong DOM/state.
2. Why compute the filtered list during render instead of in state?
3. When would you reach for `useReducer` here? → As actions multiply
   (add/toggle/delete/clear/edit), a reducer centralises the logic.
4. How would you add **edit-in-place**?

## Stretch goals

- Edit a todo on double-click.
- `useReducer` refactor.
- Drag-to-reorder.
- Show counts per filter.
