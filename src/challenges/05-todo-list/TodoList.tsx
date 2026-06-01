import { useState } from "react";
// import { useLocalStorage } from "../../hooks/useLocalStorage";

/**
 * STARTER — your turn. See README.md.
 *
 * Build add / toggle / delete / filter, then persist to localStorage with the
 * useLocalStorage hook (already written for you in src/hooks).
 */

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

type Filter = "all" | "active" | "completed";

export default function TodoList() {
  // TODO: swap useState for useLocalStorage("todos", []) to persist on refresh.
  const [todos] = useState<Todo[]>([
    { id: "1", text: "Read the README for this challenge", done: false },
  ]);
  const [filter] = useState<Filter>("all");

  // TODO 1: addTodo(text) — push a new todo (use crypto.randomUUID() for id).
  // TODO 2: toggleTodo(id) — flip `done` immutably (map + spread).
  // TODO 3: deleteTodo(id) — filter it out.
  // TODO 4: derive `visibleTodos` from todos + filter (DON'T store it in state).
  // TODO 5: show an "N items left" count and a "Clear completed" button.

  const visibleTodos = todos; // ← replace with derived/filtered list

  return (
    <div>
      <p className="todo-note">
        ✍️ <strong>Your turn.</strong> Implement add / toggle / delete / filter,
        then persist with <code>useLocalStorage</code>. Key lesson: the filtered
        list is <em>derived</em> state — compute it during render, never store
        it. Full spec in <code>README.md</code>.
      </p>

      <form
        className="row"
        style={{ marginTop: 16 }}
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: read the input and call addTodo
        }}
      >
        <input className="field" placeholder="What needs doing?" />
        <button className="btn" type="submit">
          Add
        </button>
      </form>

      <div className="row" style={{ margin: "14px 0" }}>
        {(["all", "active", "completed"] as Filter[]).map((f) => (
          <button
            key={f}
            className={`btn secondary ${filter === f ? "" : ""}`}
            // TODO: onClick={() => setFilter(f)} and highlight the active one
          >
            {f}
          </button>
        ))}
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {visibleTodos.map((t) => (
          <li
            key={t.id}
            className="row"
            style={{ padding: "8px 0", justifyContent: "space-between" }}
          >
            <label className="row" style={{ gap: 8 }}>
              <input type="checkbox" checked={t.done} readOnly />
              <span
                style={{
                  textDecoration: t.done ? "line-through" : "none",
                  color: t.done ? "var(--muted)" : "var(--text)",
                }}
              >
                {t.text}
              </span>
            </label>
            <button className="btn secondary">✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
