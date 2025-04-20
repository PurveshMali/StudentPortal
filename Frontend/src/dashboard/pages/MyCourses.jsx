import React, { useState } from "react";
import { Search, Filter, BookOpen, Bookmark, User, Clock, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const navigate = useNavigate();

  // Mock data from the provided code
  const allCourses = [
    {
      id: "1",
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Alan Smith",
      image: "https://wallpaperaccess.com/full/4578898.jpg",
      category: "Computer Science",
      level: "Intermediate",
      studentsCount: 2543,
      duration: "8 weeks",
    },
    {
      id: "2",
      title: "Advanced Data Structures",
      instructor: "Prof. Maria Rodriguez",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&h=280",
      category: "Programming",
      level: "Advanced",
      studentsCount: 1842,
      duration: "10 weeks",
    },
    {
      id: "3",
      title: "Web Development with React",
      instructor: "Alex Johnson",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&h=280",
      category: "Web Development",
      level: "Beginner",
      studentsCount: 3721,
      duration: "6 weeks",
    },
    {
      id: "4",
      title: "Natural Language Processing",
      instructor: "Dr. James Wilson",
      image: "https://wallpaperaccess.com/full/4578898.jpg",
      category: "AI & ML",
      level: "Advanced",
      studentsCount: 1254,
      duration: "12 weeks",
    },
    {
      id: "5",
      title: "Blockchain Fundamentals",
      instructor: "Emma Davis",
      image:
        "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=500&h=280",
      category: "Cryptography",
      level: "Intermediate",
      studentsCount: 876,
      duration: "8 weeks",
    },
    {
      id: "6",
      title: "Cloud Architecture",
      instructor: "Robert Chang",
      image:
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&h=280",
      category: "Cloud Computing",
      level: "Intermediate",
      studentsCount: 2132,
      duration: "10 weeks",
    },
    {
      id: "7",
      title: "Mobile App Development with Flutter",
      instructor: "Jessica Kim",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=500&h=280",
      category: "Mobile Development",
      level: "Beginner",
      studentsCount: 1879,
      duration: "8 weeks",
    },
    {
      id: "8",
      title: "Cybersecurity Essentials",
      instructor: "David Miller",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=500&h=280",
      category: "Security",
      level: "Intermediate",
      studentsCount: 1547,
      duration: "6 weeks",
    },
  ];

  const myCourses = [
    {
      id: "1",
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Alan Smith",
      image:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&h=280",
      category: "Computer Science",
      level: "Intermediate",
      studentsCount: 2543,
      duration: "8 weeks",
      progress: 65,
    },
    {
      id: "2",
      title: "Advanced Data Structures",
      instructor: "Prof. Maria Rodriguez",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&h=280",
      category: "Programming",
      level: "Advanced",
      studentsCount: 1842,
      duration: "10 weeks",
      progress: 32,
    },
    {
      id: "3",
      title: "Web Development with React",
      instructor: "Alex Johnson",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&h=280",
      category: "Web Development",
      level: "Beginner",
      studentsCount: 3721,
      duration: "6 weeks",
      progress: 78,
    },
  ];

  const savedCourses = [
    {
      id: "4",
      title: "Natural Language Processing",
      instructor: "Dr. James Wilson",
      image: "https://wallpaperaccess.com/full/4578898.jpg",
      category: "AI & ML",
      level: "Advanced",
      studentsCount: 1254,
      duration: "12 weeks",
    },
    {
      id: "5",
      title: "Blockchain Fundamentals",
      instructor: "Emma Davis",
      image:
        "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=500&h=280",
      category: "Cryptography",
      level: "Intermediate",
      studentsCount: 876,
      duration: "8 weeks",
    },
  ];

  // Get unique categories and levels from courses
  const categories = [
    "All Categories",
    ...new Set(allCourses.map((course) => course.category)),
  ];
  const levels = [
    "All Levels",
    ...new Set(allCourses.map((course) => course.level)),
  ];

  // State for active tab, filters, and search
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [levelFilter, setLevelFilter] = useState("All Levels");

  // Filter courses based on search, category, and level
  const getFilteredCourses = () => {
    let coursesToFilter = [];

    // Select courses based on active tab
    if (activeTab === "all") coursesToFilter = allCourses;
    else if (activeTab === "my") coursesToFilter = myCourses;
    else if (activeTab === "saved") coursesToFilter = savedCourses;

    return coursesToFilter.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "All Categories" ||
        course.category === categoryFilter;
      const matchesLevel =
        levelFilter === "All Levels" || course.level === levelFilter;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  };

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const CourseCard = ({ course }) => {
    const isMyCourse = myCourses.some((myCourse) => myCourse.id === course.id);

    return (
      <div
        className="bg-[#1A1A1A] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer border border-[#2A2A2A]"
        onClick={() => handleCourseClick(course.id)}
      >
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&h=280"
            alt={course.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4 bg-[#0F0F0F] text-white text-xs font-semibold px-3 py-1 rounded-full border border-gray-700 shadow-sm">
            {course.category}
          </div>
        </div>

        <div className="p-4 text-white">
          <div className="mb-2">
            <span className="inline-block bg-[#383838] text-purple-200 text-xs font-semibold rounded-full px-3 py-1">
              {course.level}
            </span>
          </div>

          <h3 className="text-lg font-bold mb-1">{course.title}</h3>
          <p className="text-sm text-gray-400 mb-3">By {course.instructor}</p>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center">
              <User size={16} className="mr-1 text-gray-400" />
              <span>{course.studentsCount.toLocaleString()} students</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1 text-gray-400" />
              <span>{course.duration}</span>
            </div>
          </div>

          {isMyCourse && (
            <div className="mt-2">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-[#C27AFF] h-2 rounded-full"
                  style={{
                    width: `${
                      myCourses.find((c) => c.id === course.id).progress
                    }%`,
                  }}
                ></div>
              </div>
              <div className="text-xs text-right mt-1 text-gray-400">
                {myCourses.find((c) => c.id === course.id).progress}% complete
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#0F0F0F] min-h-screen p-6 text-white">
      <div className="max-w-screen-xl mx-auto">
        {/* Tabs and Create Course button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
          <div className="flex flex-wrap space-x-1 bg-[#1A1A1A] rounded-lg p-1 shadow-sm">
            {[
              { label: "All Courses", value: "all" },
              { label: "My Courses", value: "my" },
              { label: "Saved", value: "saved" },
            ].map(({ label, value }) => (
              <button
                key={value}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition ${
                  activeTab === value
                    ? "bg-[#C27AFF] text-white"
                    : "text-gray-400 hover:text-white hover:bg-[#2A2A2A]"
                }`}
                onClick={() => setActiveTab(value)}
              >
                {value === "saved" ? (
                  <Bookmark size={18} className="mr-2" />
                ) : (
                  <BookOpen size={18} className="mr-2" />
                )}
                {label}
              </button>
            ))}
          </div>

        </div>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-[#1A1A1A] text-white placeholder-gray-500 focus:ring-[#C27AFF] focus:border-[#C27AFF]"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              className="bg-[#1A1A1A] border border-gray-700 text-white rounded-lg px-3 py-2 focus:ring-[#C27AFF] focus:border-[#C27AFF]"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category} className="text-black">
                  {category}
                </option>
              ))}
            </select>

            <select
              className="bg-[#1A1A1A] border border-gray-700 text-white rounded-lg px-3 py-2 focus:ring-[#C27AFF] focus:border-[#C27AFF]"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
            >
              {levels.map((level) => (
                <option key={level} value={level} className="text-black">
                  {level}
                </option>
              ))}
            </select>

            <button className="flex items-center gap-2 bg-[#1A1A1A] border border-gray-700 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded-lg px-4 py-2 transition">
              <Filter size={16} />
              More Filters
            </button>
          </div>
        </div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredCourses().map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Empty state */}
        {getFilteredCourses().length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-400">
              No courses match your filters
            </p>
            <button
              className="mt-4 text-[#C27AFF] hover:text-purple-300"
              onClick={() => {
                setSearchQuery("");
                setCategoryFilter("All Categories");
                setLevelFilter("All Levels");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
