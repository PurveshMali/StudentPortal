"use client"
import { useTheme } from "../context/ThemeContext"
import { X } from "lucide-react"

const Notifications = ({ onClose }) => {
  const { theme } = useTheme()

  const notifications = [
    {
      id: 1,
      title: "New Course Added",
      message: "A new course 'Advanced AI' has been added to the platform.",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Assignment Due",
      message: "The assignment for 'Data Structures' is due tomorrow.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Forum Activity",
      message: "John Doe replied to your question in the Physics forum.",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 4,
      title: "Grade Updated",
      message: "Your grade for 'Introduction to Programming' has been updated.",
      time: "1 day ago",
      read: true,
    },
  ]

  return (
    <div
      className={`absolute right-0 mt-2 w-80 rounded-md shadow-lg ${
        theme === "dark" ? "bg-dark-card text-primary-foreground" : "bg-white text-gray-800"
      } border ${theme === "dark" ? "border-gray-700" : "border-gray-200"} z-50`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium">Notifications</h3>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <X size={18} />
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b border-gray-200 dark:border-gray-700 ${
              !notification.read ? "bg-primary-background dark:bg-primary-hover/10" : ""
            }`}
          >
            <div className="flex justify-between">
              <h4 className="text-sm font-medium">{notification.title}</h4>
              {!notification.read && <span className="w-2 h-2 bg-primary rounded-full"></span>}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{notification.time}</p>
          </div>
        ))}
      </div>
      <div className="p-2 text-center border-t border-gray-200 dark:border-gray-700">
        <button className="text-sm text-primary hover:underline">Mark all as read</button>
      </div>
    </div>
  )
}

export default Notifications

