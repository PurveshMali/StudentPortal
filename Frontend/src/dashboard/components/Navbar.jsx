"use client";

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Bell, Sun, Moon, Search, ChevronDown } from "lucide-react";
import Notifications from "./Notifications";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isEducatorDashboard = location.pathname.includes("educator-dashboard");

  const handleEducatorToggle = () => {
    setShowUserMenu(false); // Close dropdown after click

    if (!user?.isEducator) {
      navigate("/new-educator");
    } else {
      // Toggle between dashboards
      navigate(isEducatorDashboard ? "/dashboard" : "/educator-dashboard");
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 ml-64 z-30 bg-dark-card text-primary-foreground bg-white text-gray-800 border-b border-purple-100">
      <div className="flex items-center justify-end px-6 py-3 space-x-4">
        {/* Theme toggle can be added here */}
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
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isEducatorDashboard ? "Educator" : "Learner"}
              </p>
            </div>
            <ChevronDown size={16} />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 py-3 rounded-xl shadow-2xl bg-purple-900 text-white z-50 border border-gray-200">
              <button
                onClick={handleEducatorToggle}
                className="w-full px-4 py-3 text-sm font-semibold text-center text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md hover:from-purple-600 hover:to-indigo-600 transition"
              >
                {!user?.isEducator
                  ? "Unlock Educator Portal"
                  : isEducatorDashboard
                  ? "Switch to Learner"
                  : "Switch to Educator"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
