"use client"
import { useState, useEffect } from "react"
// import { useSearchParams } from "next/navigation"
import CourseForm from "./CourseForm"
import { useNavigate, useSearchParams } from "react-router-dom"
import Navbar from "../components/Navbar"

const EducatorDashboard = () => {
    const [searchParams] = useSearchParams()
    const [showCourseForm, setShowCourseForm] = useState(false)
    const [courses, setCourses] = useState([])
  
    useEffect(() => {
      const shouldShowForm = searchParams.get("showCourseForm") === "true"
      setShowCourseForm(shouldShowForm)
    }, [searchParams])

  const handleAddCourse = () => {
    setShowCourseForm(true)
  }

  const handleCourseSubmit = (courseData) => {
    // In a real app, this would be an API call
    console.log("Course data to submit:", courseData)

    // Add the new course to the list
    setCourses([...courses, courseData])

    // Hide the form
    setShowCourseForm(false)
  }

  const handleCancelForm = () => {
    setShowCourseForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-purple-700 text-2xl font-bold flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                EduConnect
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </div>

              <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-medium">
                
              </div>
            </div>
          </div>
        </div>
      </header> */}
    
<Navbar />
      {/* Sidebar and Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white h-screen border-r border-gray-200 fixed">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center p-3 text-purple-700 bg-purple-50 rounded-lg font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-3"
                  >
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-3"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                  My Sessions
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Educator Dashboard</h1>

            {!showCourseForm && (
              <button
                onClick={handleAddCourse}
                className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all font-medium flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add New Course
              </button>
            )}
          </div>

          {showCourseForm ? (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 py-4 px-6">
                <h2 className="text-xl font-bold text-white">Create New Course</h2>
              </div>
              <div className="p-6">
                <CourseForm onSubmit={handleCourseSubmit} onCancel={handleCancelForm} />
              </div>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-purple-600"
                      >
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Total Courses</p>
                      <h3 className="text-2xl font-bold text-gray-800">{courses.length}</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Total Students</p>
                      <h3 className="text-2xl font-bold text-gray-800">0</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Total Revenue</p>
                      <h3 className="text-2xl font-bold text-gray-800">$0</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Courses List */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 py-4 px-6">
                  <h2 className="text-xl font-bold text-white">My Courses</h2>
                </div>

                <div className="p-6">
                  {courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {courses.map((course, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all"
                        >
                          <div className="h-40 bg-purple-100 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="48"
                              height="48"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-purple-400"
                            >
                              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                            </svg>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-lg text-gray-800 mb-1">{course.title}</h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500">{course.videoUrls.length} videos</span>
                              <span className="text-xs text-gray-500">{course.notes.length} notes</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-purple-600"
                        >
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">No courses yet</h3>
                      <p className="text-gray-600 mb-6">Create your first course to get started</p>
                      <button
                        onClick={handleAddCourse}
                        className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2 px-6 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all font-medium"
                      >
                        Create a Course
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default EducatorDashboard

