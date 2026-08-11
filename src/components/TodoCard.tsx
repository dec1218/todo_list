export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

interface TodoCardProps {
  todo: Todo;
  onToggle: (id: number) => void;
}

export default function TodoCard({ todo, onToggle }: TodoCardProps) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-[xl] border border-transparent px-[0.85rem] py-3 transition-colors duration-[150] hover:border-[#ececf3] hover:bg-[#f8f8fc]">
      <span
        className={`text-[0.9rem] text-[#22222b] transition-colors duration-[200] ${
          todo.done ? "text-[#b5b5c2] line-through" : ""
        }`}
      >
        {todo.text}
      </span>

      <button
        onClick={() => onToggle(todo.id)}
        disabled={todo.done}
        className={`flex h-[1.85rem] min-w-[3.4rem] shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#e4e4ec] bg-white px-[0.6rem] text-[0.72rem] font-semibold uppercase tracking-[0.02em] text-[#55555f] transition-colors duration-[150] ease-out hover:border-indigo-500 hover:text-indigo-500 active:scale-[0.94] disabled:cursor-default ${
          todo.done
            ? "animate-[pop_0.25s_ease] border-green-500 bg-green-500 text-white hover:border-green-500 hover:text-white active:scale-100"
            : ""
        }`}
        aria-label={todo.done ? "Completed" : "Mark as done"}
      >
        {todo.done ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="green"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          "Done"
        )}
      </button>
    </li>
  );
}
