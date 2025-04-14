import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full bg-black border-t border-white/10 text-white px-6 py-10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-sm text-gray-400">
        {/* Left: Brand */}
        <div className="flex flex-col gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              to="/"
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
                className="lucide lucide-book-open"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <path d="M12 7v14" />
                <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
              </motion.svg>
              <span className="ml-2">EduConnect</span>
            </Link>
          </motion.div>
          <p className="opacity-70">
            Your future-ready bridge between learning & earning.
          </p>
        </div>

        {/* Center: Quick Links */}
        <div className="flex justify-center space-x-6">
          <a
            href="#"
            className="hover:text-[#9b85d4] transition-colors duration-300"
          >
            Courses
          </a>
          <a
            href="#"
            className="hover:text-[#9b85d4] transition-colors duration-300"
          >
            Forum
          </a>
          <a
            href="#"
            className="hover:text-[#9b85d4] transition-colors duration-300"
          >
            Tutoring
          </a>
        </div>

        {/* Right: Call to Action */}
        <div className="flex flex-col md:items-end gap-2">
          <a
            href="/signup"
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-black hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_#6E59A5] hover:shadow-[0_0_25px_#9b85d4]"
          >
            <span className="text-white text-sm font-medium">Get Started</span>
            <div className="w-5 h-5 bg-[#6E59A5] rounded-full flex items-center justify-center text-white">
              →
            </div>
          </a>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center text-sm text-gray-600 border-t border-white/10 pt-6">
        © {new Date().getFullYear()} EduConnect. Crafted with 💜 by team AmongUs,
        for students.
      </div>
    </motion.footer>
  );
};

export default Footer;
