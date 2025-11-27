"use client"

import { useState, useEffect } from "react"
import TodoInput from "@/components/todo-input"
import TodoList from "@/components/todo-list"
import type { Todo } from "@/types"
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";



export default function Tasks() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [message, setMessage] = useState<string>("")

  // Fetch todos from database
  const fetchTodos = () => {
    fetch("http://localhost:4000/todos")
      .then((res) => res.json())
      .then((data) => {
        // Convert date strings to Date objects
        const todosWithDates = data.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
        }))
        setTodos(todosWithDates)
      })
      .catch((err) => console.error("Failed to fetch todos:", err))
  }

  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("auth");

    if (!isLoggedIn) {
      router.push("/");  // Redirect to login page (root)
    }
  }, []);


  useEffect(() => {
    // Fetch welcome message
    fetch("http://localhost:4000")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.error("Failed to fetch message:", err))

    // Fetch todos from database
    fetchTodos()
  }, [])

  const addTodo = (text: string) => {
    fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then(() => {
        // Refresh the todo list from database after adding
        fetchTodos()
      })
      .catch((err) => console.error("Failed to add todo:", err))
  }

  const toggleTodo = (id: string) => {
    // Find the current todo to get its completed status
    const todo = todos.find((t) => t.id === id)
    if (!todo) return

    fetch(`http://localhost:4000/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !todo.completed }),
    })
      .then(() => {
        // Refresh the todo list from database after updating
        fetchTodos()
      })
      .catch((err) => console.error("Failed to toggle todo:", err))
  }

  const deleteTodo = (id: string) => {
    fetch(`http://localhost:4000/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Refresh the todo list from database after deleting
        fetchTodos()
      })
      .catch((err) => console.error("Failed to delete todo:", err))
  }

  const completedCount = todos.filter((todo) => todo.completed).length

  return (
    <>
      <Navbar />
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
    </>
  )
}
