"use client"

import type { Todo } from "@/types"
import { Trash2, Check } from "lucide-react"

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition duration-200 ${todo.completed
          ? "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
        }`}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${todo.completed
            ? "bg-green-500 border-green-500"
            : "border-slate-300 dark:border-slate-600 hover:border-green-500"
          }`}
      >
        {todo.completed && <Check size={16} className="text-white" />}
      </button>

      <span
        className={`flex-1 transition-all ${todo.completed ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-900 dark:text-white"
          }`}
      >
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-slate-400 hover:text-red-500 transition-colors"
        aria-label="Delete todo"
      >
        <Trash2 size={18} />
      </button>
    </div>
  )
}
