import React from 'react';
import { motion } from 'framer-motion';

const PlatformFeatures = () => {
  const features = [
    {
      id: 1,
      title: "Student-Led Courses",
      description: "Create and share courses with peers, earning recognition and rewards for quality content.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-[#9b85d4]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      ),
    },
    {
      id: 2,
      title: "Community Forum",
      description: "Engage in discussions, solve problems, and earn points in our gamified knowledge-sharing platform.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-[#9b85d4]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
    },
    {
      id: 3,
      title: "Tutoring Services",
      description: "Connect with skilled tutors for personalized learning sessions tailored to your needs.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-[#9b85d4]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
      ),
    },
    {
      id: 4,
      title: "NGO Collaborations",
      description: "Partner with NGOs to apply your skills in real-world projects that make a difference.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-[#9b85d4]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 px-4 bg-black relative overflow-hidden">
      {/* Animated background gradient blobs */}
      <motion.div 
        className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-[#6E59A5]/5 blur-3xl"
        animate={{ 
          x: [0, 20, 0], 
          y: [0, -20, 0],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-indigo-900/5 blur-3xl"
        animate={{ 
          x: [0, -20, 0], 
          y: [0, 20, 0],
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="max-w-7xl mx-auto text-center relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 
          className="text-3xl font-bold mb-4 text-white"
          variants={itemVariants}
        >
          Platform Features
        </motion.h2>
        <motion.p 
          className="text-gray-400 max-w-3xl mx-auto mb-16"
          variants={itemVariants}
        >
          Our comprehensive educational ecosystem combines peer learning, expert tutoring, and real-world applications
          with ML-powered personalization.
        </motion.p>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="bg-gray-900 p-8 rounded-lg border border-gray-800 hover:border-[#6E59A5]/40 shadow-lg hover:shadow-purple-900/10 transition-all duration-300 flex flex-col items-center group"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="bg-[#6E59A5]/10 border border-[#6E59A5]/20 p-4 rounded-full mb-6 group-hover:bg-[#6E59A5]/20 transition-colors duration-300"
                whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-400 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PlatformFeatures;