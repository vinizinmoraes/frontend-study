# 11 · Modal / Dialog (with focus trap)

**Difficulty:** Hard · **Type:** 📖 Reference solution

## Prompt

> Build an accessible modal dialog. It should close on Esc and backdrop click,
> trap focus, and behave correctly for keyboard and screen-reader users.

This is a deep one. Almost everyone gets the easy 60% (show/hide a box) and
misses the accessibility 40% that actually matters — which is exactly why it's a
great senior question.

## The full checklist

- [x] Rendered in a **portal** (`createPortal`) so it escapes parent
      `overflow`, `z-index`, and stacking contexts.
- [x] **Esc** closes it.
- [x] **Backdrop click** closes it — but clicking *inside* the panel does not.
- [x] **Focus trap:** Tab / Shift+Tab cycle within the dialog and never escape
      to the page behind it.
- [x] Focus moves **into** the dialog on open, and is **restored** to the
      trigger element on close.
- [x] **Body scroll lock** while open.
- [x] ARIA: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.

## Why each piece matters

- **Portal** — a modal positioned `fixed` still gets clipped/stacked wrong if an
  ancestor has `overflow: hidden` or its own stacking context. Portaling to
  `document.body` sidesteps all of it.
- **Focus trap + restore** — keyboard and screen-reader users must not "fall
  out" of the dialog into the inert page behind it, and should land back where
  they were when it closes.
- **Backdrop vs panel click** — compare `e.target === e.currentTarget` so only
  the backdrop itself closes.

## Follow-up questions to rehearse

1. Why a portal instead of rendering inline?
2. How does the focus trap work? → Intercept Tab, find first/last focusable,
   wrap around at the edges.
3. What does `aria-modal` tell assistive tech? → Content outside the dialog is
   inert.
4. What edge cases break naive implementations? → Nested modals, no focusable
   children, the trigger unmounting, restoring focus.
5. When would you use the native `<dialog>` element or a library like Radix /
   React Aria instead? → They handle these details (and more) for you.

## Stretch goals

- Support nested/stacked modals.
- Use the `inert` attribute on the rest of the page.
- Animate enter/exit.
- Rebuild on top of the native `<dialog>` element and compare.
