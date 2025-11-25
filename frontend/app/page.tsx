"use client"

import { useState, useEffect } from "react"
import TodoInput from "@/components/todo-input"
import TodoList from "@/components/todo-list"
import type { Todo } from "@/types"

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    fetch("http://localhost:4000")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.error("Failed to fetch message:", err))
  }, [])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    }
    setTodos([newTodo, ...todos])
    fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
    .catch((err) => console.error("Failed to add todo:", err))
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const completedCount = todos.filter((todo) => todo.completed).length

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">My Tasks</h1>
          {message && <p className="text-lg text-blue-600 dark:text-blue-400 mb-2">{message}</p>}
          <p className="text-slate-600 dark:text-slate-400">
            {completedCount} of {todos.length} completed
          </p>
        </div>

        <div className="space-y-6">
          <TodoInput onAdd={addTodo} />
          <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        </div>

        {todos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400 text-lg">No tasks yet. Add one to get started! ✨</p>
          </div>
        )}
      </div>
    </main>
  )
}
