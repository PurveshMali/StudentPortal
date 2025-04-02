import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaChartLine, 
  FaBook, 
  FaComments, 
  FaMedal, 
  FaCalendarAlt, 
  FaGraduationCap,
  FaSearch
} from "react-icons/fa";

import LearningGoals from "../components/LearningGoals";
import WeeklyActivityChart from "../components/WeeklyActivityChart";
import Sidebar from "../components/Sidebar";

const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const statsData = [
    { 
      title: "Courses Enrolled", 
      value: 12, 
      change: "+8%", 
      icon: <FaBook className="text-blue-500" size={24} />,
      bgColor: "bg-blue-50" 
    },
    { 
      title: "Forum Points", 
      value: 485, 
      change: "+12%", 
      icon: <FaComments className="text-green-500" size={24} />,
      bgColor: "bg-green-50" 
    },
    { 
      title: "Tutoring Sessions", 
      value: 8, 
      change: "+5%", 
      icon: <FaCalendarAlt className="text-purple-500" size={24} />,
      bgColor: "bg-purple-50" 
    },
    { 
      title: "Achievements", 
      value: 16, 
      change: "+2%", 
      icon: <FaMedal className="text-amber-500" size={24} />,
      bgColor: "bg-amber-50"
    },
  ];

  const goalsData = [
    { title: "Complete Machine Learning Course", progress: 65 },
    { title: "Earn 1000 Forum Points", progress: 48 },
    { title: "Complete 10 Tutoring Sessions", progress: 80 },
    { title: "Contribute to Open Source Project", progress: 25 },
  ];

  const recommendedCourses = [
    {
      id: 1,
      title: "Advanced Data Science",
      instructor: "Dr. Sarah Johnson",
      progress: 75,
      image: "/api/placeholder/80/60",
      enrolled: true
    },
    {
      id: 2,
      title: "Web Development Bootcamp",
      instructor: "Michael Chen",
      progress: 32,
      image: "/api/placeholder/80/60",
      enrolled: true
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      instructor: "Jessica Wong",
      progress: 0,
      image: "/api/placeholder/80/60",
      enrolled: false
    }
  ];

  // StatCard component defined inline
  const StatCard = ({ title, value, change, icon, bgColor }) => (
    <div className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className={`flex items-center justify-center p-3 rounded-lg ${bgColor}`}>
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-500">{title}</p>
        <div className="flex items-center">
          <h3 className="text-xl font-bold mr-2">{value}</h3>
          <span className={`text-xs ${change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
            {change}
          </span>
        </div>
      </div>
    </div>
  );

  // CourseCard component defined inline
  const CourseCard = ({ title, instructor, progress, image, enrolled }) => (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex p-4">
        <img 
          src={image} 
          alt={title} 
          className="w-20 h-16 object-cover rounded-md" 
        />
        <div className="ml-3 flex-1">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">Instructor: {instructor}</p>
          
          {enrolled ? (
            <>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ width: `${progress}%` }} 
                ></div>
              </div>
              <p className="text-xs text-right mt-1 text-gray-500">{progress}% complete</p>
            </>
          ) : (
            <button className="mt-2 px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors">
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar component */}
      <Sidebar />
    
      {/* Main Content */}
      <div className="flex-1 overflow-auto lg:ml-56">
        <div className="p-4 lg:p-6">
          {/* Search bar */}
          {/* <div className="flex mb-6 bg-white rounded-xl shadow-sm p-3">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses, tutorials, or forums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div> */}

          {/* Welcome message */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, Alex!</h1>
            <p className="text-gray-600">Continue your learning journey where you left off.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statsData.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Weekly Activity Chart */}
            <div className="lg:col-span-2 bg-white shadow-sm rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Weekly Activity</h2>
                <div className="flex space-x-2">
                  <select className="text-sm border rounded-md px-2 py-1 text-gray-600">
                    <option>This Week</option>
                    <option>Last Week</option>
                    <option>Last Month</option>
                  </select>
                </div>
              </div>
              <WeeklyActivityChart />
            </div>

            {/* Learning Goals */}
            <div className="bg-white shadow-sm rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Learning Goals</h2>
                <button className="text-sm text-indigo-600 hover:underline">Add New</button>
              </div>
              <LearningGoals goals={goalsData} />
            </div>
          </div>

          {/* My Courses Section */}
          <div className="bg-white shadow-sm rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <FaGraduationCap className="mr-2 text-indigo-600" />
                My Courses
              </h2>
              <Link
                to="/courses"
                className="text-indigo-600 text-sm hover:underline flex items-center"
              >
                View all courses
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-white shadow-sm rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h2>
              <Link
                to="/sessions"
                className="text-indigo-600 text-sm hover:underline"
              >
                View calendar
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-600">
                <div>
                  <h3 className="font-medium">Data Science Tutoring</h3>
                  <p className="text-sm text-gray-500">with Prof. Johnson</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Tomorrow</p>
                  <p className="text-sm text-gray-500">10:00 - 11:30 AM</p>
                </div>
              </div>
              <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg border-l-4 border-green-600">
                <div>
                  <h3 className="font-medium">Group Study: Web Development</h3>
                  <p className="text-sm text-gray-500">with 5 classmates</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">April 5</p>
                  <p className="text-sm text-gray-500">2:00 - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;