import { useState } from "react";

/**
 * SOLUTION for 10 · Form Validation.
 *
 * The grading criteria and where they live:
 * - `errors` is DERIVED from `values` on every render — never stored, so it
 *   can't go stale.
 * - Error TIMING: a field's error is shown only if it has been touched
 *   (blurred) OR a submit was attempted. Once visible, it updates live as the
 *   user types, which is the forgiving validate-on-blur / revalidate-on-change
 *   pattern.
 * - Async submit: button disabled + label swap while the fake request runs.
 * - a11y: aria-invalid on bad fields, aria-describedby pointing at the error
 *   message so screen readers announce it.
 */

interface Values {
  email: string;
  password: string;
  confirm: string;
}

type Errors = Partial<Record<keyof Values, string>>;
type Touched = Partial<Record<keyof Values, boolean>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(values.email)) errors.email = "Enter a valid email.";

  if (!values.password) errors.password = "Password is required.";
  else if (values.password.length < 8)
    errors.password = "Password must be at least 8 characters.";

  if (values.confirm !== values.password)
    errors.confirm = "Passwords don't match.";

  return errors;
}

const fakeSignup = () => new Promise<void>((r) => setTimeout(r, 1200));

export default function SignupFormSolution() {
  const [values, setValues] = useState<Values>({ email: "", password: "", confirm: "" });
  const [touched, setTouched] = useState<Touched>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const errors = validate(values); // derived every render
  const isValid = Object.keys(errors).length === 0;

  const showError = (field: keyof Values) =>
    (touched[field] || submitAttempted) ? errors[field] : undefined;

  function update(field: keyof Values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    setSuccess(false);
  }

  function blur(field: keyof Values) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitAttempted(true);
    if (!isValid || submitting) return;
    setSubmitting(true);
    await fakeSignup();
    setSubmitting(false);
    setSuccess(true);
    setValues({ email: "", password: "", confirm: "" });
    setTouched({});
    setSubmitAttempted(false);
  }

  return (
    <form
      style={{ display: "grid", gap: 14, maxWidth: 380 }}
      onSubmit={handleSubmit}
      noValidate
    >
      <Field label="Email" error={showError("email")} name="email">
        <input
          className="field"
          type="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          onBlur={() => blur("email")}
          aria-invalid={!!showError("email")}
          aria-describedby={showError("email") ? "email-error" : undefined}
        />
      </Field>

      <Field label="Password" error={showError("password")} name="password">
        <input
          className="field"
          type="password"
          value={values.password}
          onChange={(e) => update("password", e.target.value)}
          onBlur={() => blur("password")}
          aria-invalid={!!showError("password")}
          aria-describedby={showError("password") ? "password-error" : undefined}
        />
      </Field>

      <Field label="Confirm password" error={showError("confirm")} name="confirm">
        <input
          className="field"
          type="password"
          value={values.confirm}
          onChange={(e) => update("confirm", e.target.value)}
          onBlur={() => blur("confirm")}
          aria-invalid={!!showError("confirm")}
          aria-describedby={showError("confirm") ? "confirm-error" : undefined}
        />
      </Field>

      <button
        className="btn"
        type="submit"
        disabled={submitting || (submitAttempted && !isValid)}
      >
        {submitting ? "Creating account…" : "Create account"}
      </button>

      {success && (
        <p style={{ color: "var(--green)", margin: 0 }} role="status">
          ✅ Account created!
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontSize: 13, color: "var(--muted)" }}>{label}</span>
      {children}
      {error && (
        <span id={`${name}-error`} style={{ fontSize: 13, color: "var(--red)" }}>
          {error}
        </span>
      )}
    </label>
  );
}
