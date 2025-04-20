"use client";

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Bell, ChevronDown } from "lucide-react";
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
    setShowUserMenu(false);

    if (!user?.isEducator) {
      navigate("/new-educator");
    } else {
      navigate(isEducatorDashboard ? "/dashboard" : "/educator-dashboard");
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 ml-64 z-30 bg-[#131313] text-white border-b border-[#3a3a3c]">
      <div className="flex items-center justify-end px-6 py-3 space-x-4">
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-[#2c2c2e] relative transition"
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
            className="flex items-center space-x-2 p-1 pr-2 rounded-lg hover:bg-[#2c2c2e] transition"
          >
            <img
              src="https://cdn.pixabay.com/animation/2022/12/05/10/47/10-47-58-930_512.gif"
              alt="User avatar"
              className="w-10 h-10 rounded-full border-2 border-purple-400"
            />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium">{user?.firstName || "User"}</p>
              <p className="text-xs text-gray-400">
                {isEducatorDashboard ? "Educator" : "Learner"}
              </p>
            </div>
            <ChevronDown size={16} />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-auto py-1 rounded-sm shadow-2xl bg-[#2c2c2e] text-white z-50 border border-[#3a3a3c]">
              <button
                onClick={handleEducatorToggle}
                className="cursor-pointer w-full px-4 py-3 text-sm font-semibold text-center bg-transparent transition hover:bg-[#3a3a3c]"
              >
                {!user?.isEducator
                  ? "Educator Portal"
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
