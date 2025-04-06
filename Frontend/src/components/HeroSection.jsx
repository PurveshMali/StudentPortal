import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="pt-28 pb-12 px-4 bg-gray-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-purple-900/20 blur-3xl"
        animate={{ 
          x: [0, 50, 0], 
          opacity: [0.4, 0.6, 0.4] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-indigo-900/20 blur-3xl"
        animate={{ 
          x: [0, -30, 0], 
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10">
        <motion.div 
          className="lg:w-1/2 mb-12 lg:mb-0 pr-0 lg:pr-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.span 
            className="inline-block bg-[#6E59A5]/20 border border-[#6E59A5]/40 text-[#9b85d4] px-4 py-1 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Empowering educational experiences
          </motion.span>
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Learn, Create, and <span className="text-[#9b85d4]">Connect</span> in a New Way
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-300 mb-8 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            Join our platform where students teach students, collaborate with NGOs, and build real-world skills through 
            personalized learning experiences powered by AI.
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <Link to="/signup" className="bg-[#9b85d4] hover:bg-[#8774b7] transition-colors text-white font-bold rounded-md py-3 px-6">
              Get Started
            </Link>
            <Link to="/courses" className="bg-transparent border border-[#9b85d4] text-[#9b85d4] hover:bg-[#9b85d4]/10 transition-colors font-bold rounded-md py-3 px-6">
              Explore Courses
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="lg:w-1/2"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="relative rounded-xl overflow-hidden border border-gray-700 bg-gray-800 shadow-2xl shadow-purple-900/20">
            <motion.div 
              className="aspect-video w-full rounded-xl overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&h=450&q=80"
                alt="Students collaborating"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className="bg-[#6E59A5] text-white text-sm font-medium px-3 py-1 rounded-full">
                  Join 10,000+ learners
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;