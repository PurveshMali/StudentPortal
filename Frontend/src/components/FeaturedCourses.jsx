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
    <section className="py-20 px-6 bg-transparent text-white relative overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-100 mb-2 tracking-tight">
              Featured Courses
            </h2>
            <p className="text-gray-400 text-base">
              Explore top courses created by students and educators
            </p>
          </motion.div>

          <motion.a
            href="/courses"
            className="flex items-center text-[#B497FF] hover:text-[#D6C0FF] font-semibold group text-base"
            variants={itemVariants}
            whileHover={{ x: 5 }}
          >
            View all courses
            <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </motion.a>
        </div>

        {/* Course Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="group rounded-sm bg-gradient-to-br from-[#1a1a2e] via-[#1f1f30] to-[#12121c] border border-[#6E59A5]/20 backdrop-blur-sm shadow-md hover:shadow-purple-900/40 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image + Tag */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-3 right-3 bg-[#1e1e2f]/70 px-3 py-1 rounded-full text-xs font-medium text-white border border-[#6E59A5]/30">
                  {course.category}
                </div>
              </div>

              {/* Card Content */}
              <div className="flex flex-col flex-grow px-5 py-6">
                <div className="mb-3">
                  <span className="inline-block bg-[#6E59A5]/20 border border-[#6E59A5]/30 text-[#B497FF] rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase">
                    {course.level}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-1 text-white line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">By {course.instructor}</p>

                {/* Meta Info */}
                <div className="mt-auto flex justify-between items-center text-gray-400 text-xs">
                  <div className="flex items-center gap-1">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <span>{course.students.toLocaleString()} students</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
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