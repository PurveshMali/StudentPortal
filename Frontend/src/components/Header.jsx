import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`${
        scrolled ? "bg-gray-900/90 backdrop-blur-lg" : "bg-gray-900"
      } border-b border-gray-800 fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to={"/"}
                className="flex items-center text-[#9b85d4] font-bold text-xl"
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-book-open-icon lucide-book-open"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M12 7v14" />
                  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                </motion.svg>
                <span className="ml-2">EduConnect</span>
              </Link>
            </motion.div>
            <nav className="hidden md:ml-10 md:flex space-x-8">
              {["Courses", "Forum", "Tutoring", "NGO Partners"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-300 hover:text-[#9b85d4] relative px-1 py-2"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  {item}
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#9b85d4]"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </nav>
          </div>
          <div className="flex items-center">
            <motion.div 
              className="relative mr-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <input
                type="text"
                placeholder="Search courses, forums..."
                className="bg-gray-800 border border-gray-700 rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-[#9b85d4] text-gray-200 placeholder-gray-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </motion.div>
            <motion.button 
              className="p-2 ml-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-300 hover:text-[#9b85d4]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link to="/login" className="ml-4 bg-[#9b85d4] hover:bg-[#8774b7] transition-colors text-white font-bold rounded-md py-2 px-4 w-auto">
                Login
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;