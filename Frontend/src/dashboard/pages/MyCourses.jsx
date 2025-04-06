import React, { useState } from 'react';
import { Search, Filter, BookOpen, Bookmark, User, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {
  const navigate = useNavigate();
  
  // Mock data from the provided code
  const allCourses = [
    {
      id: "1",
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Alan Smith",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&h=280",
      category: "Computer Science",
      level: "Intermediate",
      studentsCount: 2543,
      duration: "8 weeks",
    },
    {
      id: "2",
      title: "Advanced Data Structures",
      instructor: "Prof. Maria Rodriguez",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&h=280",
      category: "Programming",
      level: "Advanced",
      studentsCount: 1842,
      duration: "10 weeks",
    },
    {
      id: "3",
      title: "Web Development with React",
      instructor: "Alex Johnson",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&h=280",
      category: "Web Development",
      level: "Beginner",
      studentsCount: 3721,
      duration: "6 weeks",
    },
    {
      id: "4",
      title: "Natural Language Processing",
      instructor: "Dr. James Wilson",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&h=280",
      category: "AI & ML",
      level: "Advanced",
      studentsCount: 1254,
      duration: "12 weeks",
    },
    {
      id: "5",
      title: "Blockchain Fundamentals",
      instructor: "Emma Davis",
      image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=500&h=280",
      category: "Cryptography",
      level: "Intermediate",
      studentsCount: 876,
      duration: "8 weeks",
    },
    {
      id: "6",
      title: "Cloud Architecture",
      instructor: "Robert Chang",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&h=280",
      category: "Cloud Computing",
      level: "Intermediate",
      studentsCount: 2132,
      duration: "10 weeks",
    },
    {
      id: "7",
      title: "Mobile App Development with Flutter",
      instructor: "Jessica Kim",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=500&h=280",
      category: "Mobile Development",
      level: "Beginner",
      studentsCount: 1879,
      duration: "8 weeks",
    },
    {
      id: "8",
      title: "Cybersecurity Essentials",
      instructor: "David Miller",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=500&h=280",
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
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&h=280",
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
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&h=280",
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
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&h=280",
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
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&h=280",
      category: "AI & ML",
      level: "Advanced",
      studentsCount: 1254,
      duration: "12 weeks",
    },
    {
      id: "5",
      title: "Blockchain Fundamentals",
      instructor: "Emma Davis",
      image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=500&h=280",
      category: "Cryptography",
      level: "Intermediate",
      studentsCount: 876,
      duration: "8 weeks",
    },
  ];

  // Get unique categories and levels from courses
  const categories = ["All Categories", ...new Set(allCourses.map(course => course.category))];
  const levels = ["All Levels", ...new Set(allCourses.map(course => course.level))];

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
    
    return coursesToFilter.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "All Categories" || course.category === categoryFilter;
      const matchesLevel = levelFilter === "All Levels" || course.level === levelFilter;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });
  };

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const CourseCard = ({ course }) => {
    const isMyCourse = myCourses.some(myCourse => myCourse.id === course.id);

    return (
      <div 
        className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
        onClick={() => handleCourseClick(course.id)}
      >
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&h=280" alt={course.title} className="w-full h-48 object-cover" />
          <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-xs font-medium">
            {course.category}
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-2">
            <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium rounded-full px-3 py-1">
              {course.level}
            </span>
          </div>
          
          <h3 className="text-lg font-bold mb-1">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-3">By {course.instructor}</p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center">
              <User size={16} className="mr-1" />
              <span>{course.studentsCount.toLocaleString()} students</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{course.duration}</span>
            </div>
          </div>
          
          {isMyCourse && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${myCourses.find(c => c.id === course.id).progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-right mt-1 text-gray-500">
                {myCourses.find(c => c.id === course.id).progress}% complete
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-screen-xl mx-auto">
        {/* Tabs and Create Course button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
            <button
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === "all" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("all")}
            >
              <BookOpen size={18} className="mr-2" />
              All Courses
            </button>
            <button
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === "my" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("my")}
            >
              <BookOpen size={18} className="mr-2" />
              My Courses
            </button>
            <button
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === "saved" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("saved")}
            >
              <Bookmark size={18} className="mr-2" />
              Saved
            </button>
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <select
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            
            <select
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            
            <button className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700">
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
            <p className="text-lg text-gray-600">No courses match your filters</p>
            <button 
              className="mt-4 text-purple-600 hover:text-purple-800" 
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