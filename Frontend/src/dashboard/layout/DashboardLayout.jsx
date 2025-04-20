"use client"

import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { useTheme } from "../context/ThemeContext"
import { DashboardProvider } from "../context/DashboardContext"
import { useAuth } from "../hooks/useAuth"
import Loader from "../components/Loader"

// Import all pages
import Overview from "../pages/Overview"
import MyCourses from "../pages/MyCourses"
import Courses from "../pages/ForumPage"
import Reports from "../pages/Tutoring"
import ForumAnalytics from "../pages/NGOPartners"
import AIInsights from "../pages/SavedPage"
import Settings from "../pages/Settings"
import NGOPartners from "../pages/NGOPartners"
import ForumPage from "../pages/ForumPage"
import Tutoring from "../pages/Tutoring"
import SavedPage from "../pages/SavedPage"

const DashboardLayout = () => {
  const { theme } = useTheme()
  const { user, loading, isAuthenticated } = useAuth()
  const [activePage, setActivePage] = useState("courses")

  if (loading) {
    return <Loader fullScreen />
  }

  if (!isAuthenticated) {
    // In a real app, redirect to login page
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary-background dark:bg-dark-background">
        <div className="p-8 rounded-lg shadow-lg bg-[#5b2ba3] dark:bg-dark-card">
          <h1 className="text-2xl font-bold mb-4">Please log in</h1>
          <p className="mb-4">You need to be logged in to access the dashboard.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover"
          >
            Refresh
          </button>
        </div>
      </div>
    )
  }

  const renderActivePage = () => {
    switch (activePage) {
      case "overview":
        return <Overview />
      case "courses":
        return <MyCourses />
      case "forum":
        return <ForumPage />
      case "tutoring":
        return <Tutoring />
      case "ngoPartners":
        return <NGOPartners />
      case "saved":
        return <SavedPage />
      case "settings":
        return <Settings />
      default:
        return <MyCourses />
    }
  }

  return (
    <DashboardProvider>
      <div className={`min-h-screen bg-black`}>
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <Navbar />

        <div className="ml-64 pt-16 p-6">{renderActivePage()}</div>
      </div>
    </DashboardProvider>
  )
}

export default DashboardLayout

