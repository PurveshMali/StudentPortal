"use client"
import { useTheme } from "../context/ThemeContext"
import { Sun, Moon } from "lucide-react"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full ${
        theme === "dark"
          ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      } transition-colors`}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}

export default ThemeToggle

