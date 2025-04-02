"use client"

import { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../hooks/useAuth"
import { Bell, Sun, Moon, Search, ChevronDown } from "lucide-react"
import Notifications from "./Notifications"

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <div
      className={`fixed top-0 right-0 left-0 ml-64 z-30 ${theme === "dark" ? "bg-dark-card text-primary-foreground" : "bg-white text-gray-800"} border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
    >
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex-1">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className={`block w-full pl-10 pr-3 py-2 rounded-md ${
                theme === "dark"
                  ? "bg-gray-800 text-white border-gray-700 focus:border-primary"
                  : "bg-gray-100 text-gray-900 border-gray-300 focus:border-primary"
              } border focus:outline-none focus:ring-1 focus:ring-primary`}
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative"
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            {showNotifications && <Notifications onClose={() => setShowNotifications(false)} />}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                src={"https://cdn.pixabay.com/animation/2022/12/05/10/47/10-47-58-930_512.gif"}
                alt="User avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user?.firstName || "User"}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role || "Role"}</p>
              </div>
              <ChevronDown size={16} />
            </button>

            {showUserMenu && (
              <div
                className={`absolute right-0 mt-2 w-48 py-2 rounded-md shadow-lg ${
                  theme === "dark" ? "bg-dark-card text-primary-foreground" : "bg-white text-gray-800"
                } border ${theme === "dark" ? "border-gray-700" : "border-gray-200"} z-50`}
              >
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                  Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                  Settings
                </a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar

