"use client"

import { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { Home, Users, BookOpen, BarChart2, MessageSquare, Lightbulb, Settings, Menu, X, LogOut, BarChart, GraduationCap, GraduationCapIcon, UserIcon, BookmarkIcon, BookAIcon, Book, BookOpenText } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import { Link } from "react-router-dom"

const Sidebar = ({ activePage, setActivePage }) => {
  const { theme } = useTheme()
  const { logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    { id: "overview", label: "Dashboard", icon: BarChart },
    { id: "courses", label: "My Courses", icon: BookOpenText },
    { id: "forum", label: "Forum", icon: MessageSquare },
    { id: "tutoring", label: "Tutoring", icon: GraduationCapIcon },
    { id: "ngoPartners", label: "NGO Partners", icon: UserIcon },
    { id: "saved", label: "Saved", icon: BookmarkIcon },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div
      className={`${collapsed ? "w-20" : "w-64"} transition-all duration-300 h-screen fixed left-0 top-0 z-40 
      ${theme === "dark" ? "bg-dark-card text-primary-foreground" : "bg-[#f6f5ff] text-gray-800"} 
      border-r ${theme === "dark" ? "border-purple-700" : "border-gray-200"}`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      
        {!collapsed && <Link
            to={"/"}
            className="flex items-center text-[#6E59A5] font-bold text-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-book-open-icon lucide-book-open"
            >
              <path d="M12 7v14" />
              <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
            </svg>
            <span className="ml-2">EduConnect</span>
          </Link>}
        {/* <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md text-[#6E59A5] hover:bg-gray-100 dark:hover:bg-[#fcfbff]"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button> */}
      </div>

      <div className="py-4">
        <ul className="space-y-2 px-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActivePage(item.id)}
                className={`flex items-center ${
                  collapsed ? "justify-center" : "justify-start"
                } w-full p-3 rounded-md transition-colors ${
                  activePage === item.id ? "bg-[#6e59a5ca] text-white" : "hover:bg-gray-100 dark:hover:bg-[#eae2ff]"
                }`}
              >
                <item.icon size={20} />
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={logout}
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-start"
          } w-full p-3 rounded-md hover:bg-[#6e59a5ca] dark:hover:bg-[#6e59a5ca] hover:text-white transition-colors`}
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  )
}

export default Sidebar

