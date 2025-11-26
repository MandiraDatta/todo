"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Task Manager
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/tasks" className="hover:text-blue-600 transition">
            Tasks
          </Link>
          <Link href="/profile" className="hover:text-blue-600 transition">
            Profile
          </Link>

          <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
            M
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl focus:outline-none"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 space-y-4 text-gray-700 font-medium">
          <Link
            href="/"
            className="block hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          <Link
            href="/tasks"
            className="block hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Tasks
          </Link>

          <Link
            href="/profile"
            className="block hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>

          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
              M
            </div>
            <span className="text-gray-700">Mandira</span>
          </div>
        </div>
      )}
    </nav>
  );
}
