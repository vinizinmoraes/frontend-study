# 07 · Star Rating

**Difficulty:** Medium · **Type:** ✍️ Your turn

> 🔑 **Stuck or done?** A worked solution lives in this folder's `solution/` directory — also viewable in the app via the "Solution" tab. Try it yourself first; reading the answer before struggling defeats the drill.

## Prompt

> Build a 5-star rating component. Hovering a star previews that rating;
> clicking commits it. Make it keyboard accessible and reusable.

Looks trivial. The hover/commit interaction and accessibility are what's
actually being graded.

## Requirements

- [ ] Hover a star → all stars up to it light up (preview).
- [ ] Mouse leave → fall back to the committed value.
- [ ] Click → commit the rating, call `onChange(value)`.
- [ ] Reusable: `max`, `value`, `onChange` props.
- [ ] Keyboard: focusable, ArrowLeft/Right change rating,
      `role="radiogroup"` / `role="radio"` + `aria-checked`.

## What the interviewer is testing

- **Two pieces of state, cleanly separated:** committed `value` and transient
  `hover`. The display is `hover ?? value`. Conflating them is the common bug.
- **Reusability / controlled component.** Can it be driven by a parent via
  `value`/`onChange`?
- **Accessibility.** A rating is semantically a radiogroup. Hardly anyone does
  this — doing it stands out.

## Follow-up questions to rehearse

1. Why keep `hover` separate from `value`? → So leaving the widget restores the
   committed rating without losing it.
2. How do you support **half-stars**? → Track mouse x-position within a star, or
   render two clickable halves.
3. Controlled vs uncontrolled: support both `value` (controlled) and an internal
   default.
4. Which ARIA role models "pick one of N"? → `radiogroup` + `radio`.

## Stretch goals

- Half-star ratings.
- Read-only / disabled mode.
- Custom icon via a render prop or `children`.
