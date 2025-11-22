"use client"

import type { Todo } from "@/types"
import TodoItem from "./todo-item"

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  const activeTodos = todos.filter((todo) => !todo.completed)
  const completedTodos = todos.filter((todo) => todo.completed)

  return (
    <div className="space-y-4">
      {/* Active todos */}
      {activeTodos.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase mb-3">Active Tasks</h2>
          <div className="space-y-2">
            {activeTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
            ))}
          </div>
        </div>
      )}

      {/* Completed todos */}
      {completedTodos.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase mb-3">Completed</h2>
          <div className="space-y-2">
            {completedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
