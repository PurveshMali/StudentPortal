"use client"

import { createContext, useContext, useState } from "react"

const DashboardContext = createContext()

export const DashboardProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      forumPoints: 445,
      activeCourses: 32,
      tutoringSession: 78,
      achievements: 25,
    },
    recentActivity: [
      { id: 1, user: "Purvesh Mali", action: "Completed course", course: "Advanced Mathematics", time: "2 hours ago" },
      { id: 2, user: "Prerana Pawar", action: "Submitted assignment", course: "Physics 101", time: "3 hours ago" },
      {
        id: 3,
        user: "Kartik Suryawanshi",
        action: "Joined forum discussion",
        course: "Computer Science",
        time: "5 hours ago",
      },
      { id: 4, user: "Yukta Bhat", action: "Started new course", course: "Biology Basics", time: "1 day ago" },
      { id: 5, user: "Aniket Vasane", action: "Completed quiz", course: "Chemistry 101", time: "1 day ago" },
    ],
    courseData: [
      { id: 1, name: "Mathematics", students: 245, completion: 82, rating: 4.5 },
      { id: 2, name: "Physics", students: 187, completion: 75, rating: 4.2 },
      { id: 3, name: "Computer Science", students: 310, completion: 68, rating: 4.7 },
      { id: 4, name: "Biology", students: 178, completion: 79, rating: 4.3 },
      { id: 5, name: "Chemistry", students: 156, completion: 72, rating: 4.1 },
      { id: 6, name: "History", students: 132, completion: 85, rating: 4.4 },
    ],
    performanceData: [
      { month: "Jan", students: 120, courses: 15 },
      { month: "Feb", students: 150, courses: 18 },
      { month: "Mar", students: 200, courses: 22 },
      { month: "Apr", students: 250, courses: 25 },
      { month: "May", students: 300, courses: 28 },
      { month: "Jun", students: 350, courses: 30 },
      { month: "Jul", students: 400, courses: 32 },
    ],
    forumData: {
      totalPosts: 1876,
      activeThreads: 124,
      topContributors: [
        { name: "John Doe", posts: 87 },
        { name: "Jane Smith", posts: 76 },
        { name: "Mike Johnson", posts: 65 },
      ],
      categoryEngagement: [
        { category: "Course Help", posts: 450, engagement: 85 },
        { category: "General Discussion", posts: 380, engagement: 72 },
        { category: "Study Groups", posts: 320, engagement: 78 },
        { category: "Resources", posts: 280, engagement: 65 },
        { category: "Career Advice", posts: 240, engagement: 70 },
      ],
    },
    aiInsights: {
      recommendations: [
        "Increase engagement in Physics courses by adding more interactive elements",
        "Students perform better when completing optional practice exercises",
        "Forum participation correlates with higher course completion rates",
        "Video content under 10 minutes has higher engagement rates",
      ],
      predictions: {
        enrollmentTrend: "Increasing",
        completionRateForecast: "Stable",
        challengeAreas: ["Advanced Mathematics", "Organic Chemistry"],
      },
    },
  })

  const [loading, setLoading] = useState(false)

  // Simulate data fetching
  const refreshData = () => {
    setLoading(true)
    // In a real app, this would be an API call
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <DashboardContext.Provider
      value={{
        dashboardData,
        loading,
        refreshData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export const useDashboard = () => useContext(DashboardContext)

