# 10 · Form Validation

**Difficulty:** Medium · **Type:** ✍️ Your turn

## Prompt

> Build a signup form (email, password, confirm password) with client-side
> validation. Show errors at the right time, disable submit when invalid, and
> handle an async submit.

Forms are *the* bread and butter of frontend work, and a favourite interview
topic because they touch controlled inputs, derived state, UX timing, and async.

## Requirements

- [ ] Controlled inputs for all three fields.
- [ ] Validation rules:
  - email: required + valid format
  - password: required + min 8 chars
  - confirm: must match password
- [ ] Show a field's error only after it's been **touched** (blurred) or after a
      submit attempt — not while the user is still typing it the first time.
- [ ] Disable the submit button while invalid or submitting.
- [ ] On valid submit: simulate an async request, then show success.

## What the interviewer is testing

- **Error timing / UX.** Showing "email is invalid" on the first keystroke is
  bad UX. The `touched` pattern (validate-on-blur, then validate-on-change once
  touched) is what they want to see.
- **Derived state.** `errors` is *computed* from `values`, not stored separately.
- **Async submit state.** Loading/disabled/success handling.

## Follow-up questions to rehearse

1. When do you validate — on change, on blur, or on submit? → A blend: errors
   appear on blur/submit, then update live once a field is touched.
2. Why keep `errors` derived rather than in state?
3. How would you generalise this into a reusable `useForm(initial, validate)`
   hook? What would it return? (`values`, `errors`, `touched`, `handleChange`,
   `handleBlur`, `handleSubmit`, `isValid`.)
4. When would you reach for **React Hook Form** or **Formik + Zod/Yup**, and
   what do they buy you? (Uncontrolled inputs for perf, schema validation.)

## Stretch goals

- Extract a generic `useForm` hook and rebuild the form on top of it.
- Add a schema with **Zod** and derive types from it.
- Async validation (e.g. "email already taken").
- Field-level vs form-level error summary for accessibility (`aria-describedby`,
  `aria-invalid`).
