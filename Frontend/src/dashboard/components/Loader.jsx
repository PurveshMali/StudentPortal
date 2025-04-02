"use client"
import { useTheme } from "../context/ThemeContext"

const Loader = ({ size = "medium", fullScreen = false }) => {
  const { theme } = useTheme()

  const sizeClasses = {
    small: "w-5 h-5",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  }

  const spinner = (
    <div
      className={`animate-spin rounded-full border-t-2 border-primary ${
        theme === "dark" ? "border-b-2 border-gray-700" : "border-b-2 border-gray-200"
      } ${sizeClasses[size]}`}
    ></div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-lg flex flex-col items-center">
          {spinner}
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  return <div className="flex items-center justify-center p-4">{spinner}</div>
}

export default Loader

