import { useState } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

/**
 * SOLUTION for 05 · Todo List + Filters.
 *
 * The things being graded, and where they live here:
 * - Immutable updates: every setTodos uses map/filter/spread — never push/splice.
 * - Derived state: `visibleTodos` and `itemsLeft` are computed during render
 *   from `todos` + `filter`. They are never stored, so they can never desync.
 * - Stable keys: crypto.randomUUID(), not the array index.
 * - Controlled input for the add form.
 * - Persistence via useLocalStorage (note: it's a drop-in useState replacement).
 */

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

type Filter = "all" | "active" | "completed";

export default function TodoListSolution() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("solution-todos", []);
  const [filter, setFilter] = useState<Filter>("all");
  const [draft, setDraft] = useState("");

  function addTodo(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: trimmed, done: false },
    ]);
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.done));
  }

  // Derived, not stored.
  const visibleTodos = todos.filter((t) =>
    filter === "all" ? true : filter === "active" ? !t.done : t.done
  );
  const itemsLeft = todos.filter((t) => !t.done).length;
  const hasCompleted = todos.some((t) => t.done);

  return (
    <div>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          addTodo(draft);
          setDraft("");
        }}
      >
        <input
          className="field"
          placeholder="What needs doing?"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button className="btn" type="submit" disabled={!draft.trim()}>
          Add
        </button>
      </form>

      <div className="row" style={{ margin: "14px 0" }}>
        {(["all", "active", "completed"] as Filter[]).map((f) => (
          <button
            key={f}
            className="btn secondary"
            style={
              filter === f
                ? { borderColor: "var(--accent)", color: "var(--accent)" }
                : undefined
            }
            onClick={() => setFilter(f)}
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
            <label className="row" style={{ gap: 8, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleTodo(t.id)}
              />
              <span
                style={{
                  textDecoration: t.done ? "line-through" : "none",
                  color: t.done ? "var(--muted)" : "var(--text)",
                }}
              >
                {t.text}
              </span>
            </label>
            <button
              className="btn secondary"
              onClick={() => deleteTodo(t.id)}
              aria-label={`Delete "${t.text}"`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {visibleTodos.length === 0 && (
        <p className="hint">Nothing here — {filter === "all" ? "add a todo." : `no ${filter} todos.`}</p>
      )}

      <div className="row" style={{ marginTop: 14, justifyContent: "space-between" }}>
        <span className="hint">
          {itemsLeft} item{itemsLeft === 1 ? "" : "s"} left
        </span>
        {hasCompleted && (
          <button className="btn secondary" onClick={clearCompleted}>
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}
