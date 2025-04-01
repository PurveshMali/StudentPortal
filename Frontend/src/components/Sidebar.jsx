import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaChartBar, FaBook, FaComment, FaChalkboardTeacher, FaUsers, FaBookmark, FaCog, FaQuestionCircle, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { title: "Dashboard", icon: <FaChartBar />, path: "/dashboard" },
    { title: "My Courses", icon: <FaBook />, path: "/courses" },
    { title: "Forum", icon: <FaComment />, path: "/forum" },
    { title: "Tutoring", icon: <FaChalkboardTeacher />, path: "/tutoring" },
    { title: "NGO Partners", icon: <FaUsers />, path: "/ngo-partners" },
    { title: "Saved", icon: <FaBookmark />, path: "/saved" },
    { title: "Settings", icon: <FaCog />, path: "/settings" },
    { title: "Help & Support", icon: <FaQuestionCircle />, path: "/support" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-md lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-56 bg-indigo-50 shadow-md p-5 transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Logo */}
        <div className="mb-6 flex items-center space-x-2 text-indigo-600 font-semibold text-lg">
          <FaBook className="text-xl" />
          <Link to="/">EduConnect</Link>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="space-y-2">
            {navItems.map((item, index) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-2 rounded-md transition-all duration-200
                      ${
                        isActive
                          ? "bg-indigo-200 text-indigo-700 font-medium border-l-4 border-indigo-600"
                          : "text-gray-700 hover:bg-indigo-100"
                      }`}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
