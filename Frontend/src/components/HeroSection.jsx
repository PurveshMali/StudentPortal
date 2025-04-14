import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 bg-black text-white overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-[#130d1f] via-[#150d1f] to-black" />

      {/* Glowing ring at the bottom */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[60%] h-40 bg-gradient-to-t from-[#7029ff6f] to-transparent blur-2xl rounded-full pointer-events-none" />
    
      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl w-full">
        <motion.span
          className="inline-block text-sm font-semibold bg-[#1f1f2b] text-[#9b85d4] px-4 py-1 rounded-full border border-[#6e59a580] mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          AI-powered collaboration
        </motion.span>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-wide text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Smart.
          <br />
          Connected.
          <br />
          <span className="text-[#9b85d4]">Future-Ready.</span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-gray-300 mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Empowering students with real-world skills, collaborative learning, and income opportunities - all in one future-ready platform.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            to="/login"
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#3b3b3b] bg-[#0d0d0f] text-white font-medium shadow-[0_0_10px_rgba(155,133,212,0.3)] hover:shadow-[0_0_20px_rgba(155,133,212,0.5)] transition duration-300"
          >
            <span className="text-sm">Geting Started</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9b85d4] to-[#7251c6] flex items-center justify-center shadow-inner">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
