import React from 'react';
import { motion } from 'framer-motion';

const FeaturedCourses = () => {
  const courses = [
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Alan Smith",
      students: 2543,
      duration: 8,
      level: "Intermediate",
      category: "Computer Science",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=400&q=80",
    },
    {
      id: 2,
      title: "Advanced Data Structures",
      instructor: "Prof. Maria Rodriguez",
      students: 1842,
      duration: 10,
      level: "Advanced",
      category: "Programming",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=400&q=80",
    },
    {
      id: 3,
      title: "Web Development with React",
      instructor: "Alex Johnson",
      students: 3721,
      duration: 6,
      level: "Beginner",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=400&q=80",
    },
    {
      id: 4,
      title: "Natural Language Processing",
      instructor: "Dr. James Wilson",
      students: 1254,
      duration: 12,
      level: "Advanced",
      category: "AI & ML",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=400&q=80",
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-900 text-white">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="flex justify-between items-center mb-8">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-white mb-2">Featured Courses</h2>
            <p className="text-gray-400">Explore top courses created by students and educators</p>
          </motion.div>
          <motion.a 
            href="/courses" 
            className="flex items-center text-[#9b85d4] hover:text-[#b19de3] font-medium group"
            variants={itemVariants}
            whileHover={{ x: 3 }}
          >
            View all courses 
            <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </motion.a>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-[#6E59A5]/50 shadow-lg shadow-purple-900/5 hover:shadow-purple-900/20 transition-all duration-300 flex flex-col"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="relative">
                <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                <div className="absolute top-3 right-3 bg-gray-900/70 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white">
                  {course.category}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-gray-800 to-gray-800/95">
                <div className="mb-3">
                  <span className="inline-block bg-[#6E59A5]/20 border border-[#6E59A5]/30 text-[#9b85d4] rounded-full px-3 py-1 text-sm font-medium">
                    {course.level}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{course.title}</h3>
                <p className="text-gray-400 mb-4">By {course.instructor}</p>
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
      </motion.div>
    </section>
  );
};

export default FeaturedCourses;