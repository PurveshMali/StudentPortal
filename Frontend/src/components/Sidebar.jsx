import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaBars, 
  FaChartBar, 
  FaBook, 
  FaComments, 
  FaChalkboardTeacher, 
  FaUsers, 
  FaBookmark, 
  FaCog, 
  FaQuestionCircle, 
  FaTimes,
  FaSignOutAlt,
  FaBell
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // Example notification count

  const navItems = [
    { title: "Dashboard", icon: <FaChartBar />, path: "/dashboard" },
    { title: "My Courses", icon: <FaBook />, path: "/courses" },
    { title: "Discussion Forum", icon: <FaComments />, path: "/forum" },
    { title: "Tutoring Sessions", icon: <FaChalkboardTeacher />, path: "/tutoring" },
    { title: "Community Partners", icon: <FaUsers />, path: "/partners" },
    { title: "Saved Resources", icon: <FaBookmark />, path: "/saved" },
  ];

  const bottomNavItems = [
    { title: "Settings", icon: <FaCog />, path: "/settings" },
    { title: "Help Center", icon: <FaQuestionCircle />, path: "/help" },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-md lg:hidden"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Logo and Brand */}
        <div className="p-5 border-b">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              <FaBook className="text-xl" />
            </div>
            <Link to="/" className="text-xl font-bold text-gray-800">
              EduConnect
            </Link>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-5 border-b flex items-center">
          <img
            src="/api/placeholder/40/40"
            alt="User Profile"
            className="rounded-full w-10 h-10 object-cover border-2 border-indigo-600"
          />
          <div className="ml-3">
            <p className="font-medium text-gray-900">Alex Johnson</p>
            <p className="text-xs text-gray-500">Premium Member</p>
          </div>
          <div className="ml-auto relative">
            <FaBell className="text-gray-500 hover:text-indigo-600 cursor-pointer" />
            {notifications > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-grow overflow-y-auto p-5 space-y-1">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className={isActive ? "text-indigo-600" : "text-gray-400"}>
                  {item.icon}
                </span>
                <span>{item.title}</span>
                {item.title === "Discussion Forum" && (
                  <span className="ml-auto bg-indigo-100 text-indigo-600 text-xs py-1 px-2 rounded-full">
                    5 new
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="p-5 border-t">
          {bottomNavItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-gray-400">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          ))}

          <button className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 w-full mt-2">
            <span className="text-gray-400">
              <FaSignOutAlt />
            </span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;