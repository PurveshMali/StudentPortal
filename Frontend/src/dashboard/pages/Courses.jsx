"use client"

import { useState } from "react"
import { useDashboardData } from "../hooks/useDashboardData"
import Table from "../components/Table"
import Chart from "../components/Chart"
import Loader from "../components/Loader"
import { Search, Filter, BookOpen, Users, Award, Star } from "lucide-react"

const Courses = () => {
  const { data: dashboardData, loading } = useDashboardData()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  
  if (loading || !dashboardData) {
    return <Loader />
  }
  
  const { courseData } = dashboardData
  
  // Transform course data for chart
  const chartData = courseData.map(course => ({
    name: course.name,
    students: course.students,
    completion: course.completion,
  }))
  
  // Filter courses based on search and filter
  const filteredCourses = courseData.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === "all" || 
     (filterStatus === "high" && course.completion >= 80) ||
     (filterStatus === "medium" && course.completion >= 60 && course.completion < 80) ||
     (filterStatus === "low" && course.completion < 60))
  )
  
  const courseColumns = [
    { key: "name", label: "Course Name", sortable: true },
    { 
      key: "students", 
      label: "Students", 
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Users size={16} className="mr-2 text-gray-500" />
          {value}
        </div>
      )
    },
    { 
      key: "completion", 
      label: "Completion Rate", 
      sortable: true,
      render: (value) => (
        <div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
            <div 
              className="bg-[#6E59A5] h-2.5 rounded-full" 
              style={{ width: `${value}%` }}
            ></div>
          </div>
          <div className="text-xs">{value}%</div>
        </div>
      )
    },
    { 
      key: "rating", 
      label: "Rating", 
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <Star size={16} className="mr-1 text-yellow-500" />
          {value}
        </div>
      )
    },
    { 
      key: "actions", 
      label: "Actions",
      render: () => (
        <div className="flex space-x-2">
          <button className="px-2 py-1 text-xs bg-[#6E59A5] text-white rounded-md hover:bg-[#57428E]">
            View
          </button>
          <button className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">
            Edit
          </button>
        </div>
      )
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">Course Management</h1>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 rounded-md bg-white dark:bg-dark-card border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6E59A5]"
              placeholder="Search courses..."
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 rounded-md bg-white dark:bg-dark-card border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6E59A5]"
            >
              <option value="all">All Courses</option>
              <option value="high">High Completion (80%+)</option>
              <option value="medium">Medium Completion (60-79%)</option>
              <option value="low">Low Completion (&lt; 60%)</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-dark-card rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-[#E9E7FF] dark:bg-[#6E59A5]/20">
              <BookOpen className="w-6 h-6 text-[#6E59A5]" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold">{courseData.length}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Courses</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-card rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-[#E9E7FF] dark:bg-[#6E59A5]/20">
              <Users className="w-6 h-6 text-[#6E59A5]" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold">
                {courseData.reduce((sum, course) => sum + course.students, 0)}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Students</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart 
          type="bar" 
          data={chartData} 
          title="Course Enrollment & Completion"
          dataKeys={["students", "completion"]}
          colors={["#6E59A5", "#E9E7FF"]}
        />
        
        <Table 
          data={filteredCourses} 
          columns={courseColumns} 
          pagination={true}
          itemsPerPage={5}
        />
      </div>
    </div>
  )
}

export default Courses
