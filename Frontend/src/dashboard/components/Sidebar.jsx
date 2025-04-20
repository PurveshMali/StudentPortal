"use client"

import { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import {
  MessageSquare, BookOpenText, GraduationCapIcon, UserIcon,
  BookmarkIcon, BarChart, Settings, LogOut
} from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import { Link } from "react-router-dom"

const Sidebar = ({ activePage, setActivePage }) => {
  const { theme } = useTheme()
  const { logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    { id: "courses", label: "My Courses", icon: BookOpenText },
    { id: "forum", label: "Forum", icon: MessageSquare },
    { id: "tutoring", label: "Tutoring", icon: GraduationCapIcon },
    { id: "ngoPartners", label: "NGO Partners", icon: UserIcon },
    { id: "saved", label: "Saved", icon: BookmarkIcon },
    { id: "overview", label: "Analytics", icon: BarChart },
    { id: "settings", label: "Settings", icon: Settings }
  ]

  return (
    <div
      className={`${collapsed ? "w-20" : "w-64"} transition-all duration-300 h-screen fixed left-0 top-0 z-40 
      bg-[#131313] text-white border-r border-gray-800`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!collapsed && (
          <Link
            to={"/"}
            className="flex items-center text-purple-400 font-bold text-xl"
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
          </Link>
        )}
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
                  activePage === item.id
                    ? "bg-[#C27AFF] text-white"
                    : "hover:bg-gray-800"
                }`}
              >
                <item.icon size={20} />
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-start"
          } w-full p-3 rounded-md hover:bg-[#C27AFF] transition-colors`}
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  )
}

export default Sidebar
