import { useState, type KeyboardEvent } from "react";
import TodoCard, { type Todo } from "./TodoCard";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Write project proposal", done: false },
    { id: 2, text: "Review pull requests", done: false },
    { id: 3, text: "Buy groceries", done: true },
    { id: 4, text: "Book flight tickets", done: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const toggleDone = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  };

  const addTodo = () => {
    const text = newTodo.trim();
    if (!text) return;
    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
    setNewTodo("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addTodo();
  };

  const remaining = todos.filter((t) => !t.done).length;
  const completed = todos.length - remaining;
  const percent =
    todos.length === 0 ? 0 : Math.round((completed / todos.length) * 100);

  return (
    <div className="flex min-h-screen items-start justify-center bg-[radial-gradient(circle_at_top,#f2f3fb_0%,#eaebf4_100%)] px-6 py-16 font-sans">
      <div className="w-full max-w-[104] rounded-[1.25rem] border border-[#ececf3] bg-white p-7 shadow-[0_1px_2px_rgba(24,24,40,0.04),0_12px_32px_-12px_rgba(24,24,40,0.12)]">
        <div className="mb-[0.9rem] flex items-baseline justify-between">
          <h1 className="text-[1.3rem] font-bold tracking-tight text-[#16161d]">
            To-do list
          </h1>
          <span className="text-[0.8rem] font-medium text-[#9797a6]">
            {remaining} left
          </span>
        </div>

        <div className="mb-6 h-[1.25] overflow-hidden rounded-full bg-[#eeeef4]">
          <div
            className="h-full rounded-full bg-linear-to-r from-indigo-500 to-green-500 transition-all duration-[0.35s] ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="mb-6 flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a task..."
            className="flex-1 rounded-[0.65rem] border border-[#e4e4ec] bg-[#fafafe] px-[0.85rem] py-[0.6rem] text-sm text-[#22222b] placeholder-[#adadb9] transition-[border-color,background-color] duration-[150] ease-out focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/10"
          />
          <button
            onClick={addTodo}
            className="rounded-[0.65rem] bg-[#16161d] px-[1.1rem] py-[0.6rem] text-sm font-semibold text-white transition-colors duration-[150] ease-out hover:bg-[#33333f] active:scale-[0.97]"
          >
            Add
          </button>
        </div>

        <ul className="m-0 flex list-none flex-col gap-1 p-0">
          {todos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} onToggle={toggleDone} />
          ))}
        </ul>

        {todos.length === 0 && (
          <div className="flex flex-col items-center gap-[0.6rem] pt-9 pb-3 text-center text-[#c3c3cf]">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
            <p className="m-0 text-[0.85rem] text-[#9797a6]">
              Nothing here yet. Add a task to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
