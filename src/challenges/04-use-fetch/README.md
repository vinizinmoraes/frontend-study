# 04 · useFetch custom hook

**Difficulty:** Medium · **Type:** 📖 Reference solution

## Prompt

> Extract data fetching into a reusable hook `useFetch<T>(url)` that returns
> `{ data, loading, error }`.

## What the interviewer is testing

- Can you design a clean, **typed** hook API?
- Do you know the **gotchas of `fetch`**?
  - `fetch` does **not** reject on HTTP 404/500 — you must check `res.ok`.
  - You must cancel the request on unmount / url change or you get the dreaded
    "can't perform a React state update on an unmounted component" warning and
    potential race conditions.
- Do you re-fetch when inputs change (the `url` dependency)?

## The shape

```ts
const { data, loading, error } = useFetch<Post>(url);
```

## Key ideas in the solution

- `AbortController` + cleanup cancels stale/unmounted requests.
- We swallow `AbortError` so a cancellation doesn't surface as a real error.
- Resetting to `loading: true` when `url` changes avoids showing stale data.

## Follow-up questions to rehearse

1. Why does `fetch` resolve on a 500? → It only rejects on **network** errors;
   HTTP errors are still "successful" responses.
2. How would you add **caching** / dedupe concurrent requests for the same key?
   → This is essentially what React Query / SWR do.
3. How do you add a **refetch** function or polling?
4. What breaks if you forget the dependency array vs. an empty one?

## Why this matters

In real apps you'd reach for **React Query / SWR / RTK Query** instead of
hand-rolling this. Interviewers still ask you to build it to confirm you
understand what those libraries do under the hood: caching, dedupe,
revalidation, cancellation.

## Stretch goals

- Add a `refetch()` returned from the hook.
- Add a generic `useAsync(fn, deps)` that isn't tied to `fetch`.
- Add request deduplication with a module-level cache `Map`.
