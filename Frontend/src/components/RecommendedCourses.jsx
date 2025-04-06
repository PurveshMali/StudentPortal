import React from 'react';
import { motion } from 'framer-motion';

const RecommendedCourses = () => {
  const courses = [
    {
      id: 1,
      title: "Introduction to Python Programming",
      instructor: "Dr. Michael Chen",
      students: 4872,
      duration: 6,
      level: "Beginner",
      category: "Programming",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=400&q=80",
      match: 98,
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      instructor: "Prof. Sarah Williams",
      students: 3254,
      duration: 8,
      level: "Intermediate",
      category: "Data Science",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=400&q=80",
      match: 95,
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      instructor: "Jessica Lee",
      students: 2187,
      duration: 5,
      level: "Beginner",
      category: "Design",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=400&q=80",
      match: 92,
    },
    {
      id: 4,
      title: "Blockchain Development",
      instructor: "Dr. Robert Kim",
      students: 1543,
      duration: 10,
      level: "Advanced",
      category: "Blockchain",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=400&q=80",
      match: 89,
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-12 px-4 bg-[#141B2D]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="flex justify-between items-center mb-8"
        >
          <h2 className="text-3xl font-bold text-white">ML-Powered Learning Experience</h2>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-300 mb-8 max-w-3xl"
        >
          Courses recommended for you based on your learning history, interests, and career goals. Our machine learning
          algorithm analyzes your interactions to provide personalized suggestions.
        </motion.p>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              className="bg-[#1F2940] rounded-lg overflow-hidden shadow border border-[#303B5B] flex flex-col relative hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-3 right-3 bg-[#6E59A5] text-white px-2 py-1 rounded-full text-sm font-medium">
                {course.match}% Match
              </div>
              <div>
                <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="mb-3">
                  <span className="inline-block bg-[#2D3558] text-[#9379D7] rounded-full px-3 py-1 text-sm font-medium">
                    {course.level}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{course.title}</h3>
                <p className="text-gray-300 mb-4">By {course.instructor}</p>
                <div className="mt-auto flex justify-between items-center text-gray-400 text-sm">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
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
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>{course.duration} weeks</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button className="bg-[#6E59A5] hover:bg-[#9379D7] text-white px-6 py-3 rounded-md font-medium transition-colors duration-300">
            Explore All Courses
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default RecommendedCourses;