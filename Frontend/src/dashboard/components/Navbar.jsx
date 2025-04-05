"use client";

import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../hooks/useAuth";
import { Bell, Sun, Moon, Search, ChevronDown } from "lucide-react";
import Notifications from "./Notifications";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleEducatorUnlock = () => {
    navigate("/new-educator");
  };

  return (
    <div
      className={`fixed top-0 right-0 left-0 ml-64 z-30 ${
        theme === "dark"
          ? "bg-dark-card text-primary-foreground"
          : "bg-white text-gray-800"
      } border-b ${theme === "dark" ? "border-purple-100" : "border-gray-200"}`}
    >
      <div className="flex items-center justify-end px-6 py-3 space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-[#e9e0ff] dark:hover:bg-[#e9e0ff] transition"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-[#e9e0ff] dark:hover:bg-[#e9e0ff] relative transition"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          </button>
          {showNotifications && (
            <Notifications onClose={() => setShowNotifications(false)} />
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 p-1 pr-2 rounded-lg hover:bg-[#eee8fd] dark:hover:bg-[#e9e0ff] transition"
          >
            <img
              src="https://cdn.pixabay.com/animation/2022/12/05/10/47/10-47-58-930_512.gif"
              alt="User avatar"
              className="w-10 h-10 rounded-full border-2 border-primary"
            />
            <div className="hidden md:block">
                <p className="text-sm font-medium">{user?.firstName || "User"}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role || "Role"}</p>
              </div>
            <ChevronDown size={16} />
          </button>


          {showUserMenu && !user?.isEducator && (
            <div
              className={`absolute right-0 mt-2 w-56 py-3 rounded-xl shadow-2xl ${
                theme === "dark"
                  ? "bg-purple-900 text-white"
                  : "bg-white text-gray-800"
              } z-50 border ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <button
                onClick={handleEducatorUnlock}
                className="w-full px-4 py-3 text-sm font-semibold text-center text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md hover:from-rple-600 hover:to-indigo-600 transition"
              >
                Unlock Educator Portal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
