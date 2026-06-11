# 06 · Accordion

**Difficulty:** Medium · **Type:** ✍️ Your turn

> 🔑 **Stuck or done?** A worked solution lives in this folder's `solution/` directory — also viewable in the app via the "Solution" tab. Try it yourself first; reading the answer before struggling defeats the drill.

## Prompt

> Build an accordion. Clicking a section header expands its content; opening one
> section collapses the others (single-open). Make it keyboard accessible.

## Requirements

- [ ] Click a header to expand/collapse its panel.
- [ ] Single-open mode: opening one closes the rest.
- [ ] Accessible: header is a `<button>` with `aria-expanded` and
      `aria-controls`; panel has a matching `id` and `role="region"`.
- [ ] Works with keyboard (a `<button>` gives you Enter/Space for free — that's
      *why* you use a button, not a `<div onClick>`).

## What the interviewer is testing

- **State modelling.** Single-open = `openId: string | null`. Multi-open =
  `Set<string>`. Picking the right shape is the point.
- **Accessibility instinct.** Reaching for a real `<button>` and ARIA
  attributes unprompted is a strong senior signal.
- **Composition.** Can you design a reusable `<Accordion>` / `<AccordionItem>`
  API rather than a one-off?

## Follow-up questions to rehearse

1. Single-open vs multi-open — how does the state shape change?
2. Why a `<button>` instead of a `<div onClick>`? → Focusability, keyboard
   activation, screen-reader semantics.
3. **Controlled vs uncontrolled:** how would you let the parent control which
   panel is open via props, while still working standalone?
4. How would you animate the expand/collapse given `height: auto` can't be
   transitioned? → grid-rows trick, max-height, or measure + animate.

## Stretch goals

- Make it a controlled/uncontrolled component (`open` + `defaultOpen` props).
- Multi-open variant.
- Up/Down arrow keys move focus between headers (WAI-ARIA pattern).
- Smooth height animation.
