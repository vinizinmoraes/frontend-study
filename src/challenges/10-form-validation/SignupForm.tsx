import { useState } from "react";

/**
 * STARTER — your turn. See README.md.
 *
 * Build a signup form (email, password, confirm password) with validation that
 * shows errors on blur and on submit, disables submit while invalid/submitting,
 * and simulates an async submit.
 */

interface Values {
  email: string;
  password: string;
  confirm: string;
}

type Errors = Partial<Record<keyof Values, string>>;

// TODO 2: implement validation. Return an Errors object (empty = valid).
//   - email: required + basic format (/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
//   - password: required + min 8 chars
//   - confirm: must equal password
function validate(_values: Values): Errors {
  return {};
}

export default function SignupForm() {
  const [values, setValues] = useState<Values>({
    email: "",
    password: "",
    confirm: "",
  });
  // TODO 1: track which fields have been "touched" (blurred) so you only show
  //   an error after the user has interacted: useState<Record<keyof Values, boolean>>.
  // TODO 3: on submit — mark all touched, validate; if clean, set submitting and
  //   fake an API call (setTimeout / Promise), then show a success message.

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  function update(field: keyof Values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  return (
    <div style={{ maxWidth: 380 }}>
      <p className="todo-note">
        ✍️ <strong>Your turn.</strong> Implement <code>validate()</code>, show
        errors only after a field is touched (blur) or on submit, disable submit
        while invalid or submitting, and fake an async submit. Spec in{" "}
        <code>README.md</code>.
      </p>

      <form
        style={{ display: "grid", gap: 14, marginTop: 16 }}
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: handle submit
        }}
        noValidate
      >
        <Field label="Email">
          <input
            className="field"
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            // TODO: onBlur to mark touched
          />
          {/* TODO: {touched.email && errors.email && <Error>{errors.email}</Error>} */}
        </Field>

        <Field label="Password">
          <input
            className="field"
            type="password"
            value={values.password}
            onChange={(e) => update("password", e.target.value)}
          />
        </Field>

        <Field label="Confirm password">
          <input
            className="field"
            type="password"
            value={values.confirm}
            onChange={(e) => update("confirm", e.target.value)}
          />
        </Field>

        <button className="btn" type="submit" disabled={!isValid}>
          Create account
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontSize: 13, color: "var(--muted)" }}>{label}</span>
      {children}
    </label>
  );
}
