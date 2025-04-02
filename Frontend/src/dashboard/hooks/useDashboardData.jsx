"use client"

import { useState, useEffect } from "react"
import { useDashboard } from "../context/DashboardContext"

export const useDashboardData = (dataType) => {
  const { dashboardData, loading } = useDashboard()
  const [data, setData] = useState(null)

  useEffect(() => {
    if (dashboardData) {
      switch (dataType) {
        case "stats":
          setData(dashboardData.stats)
          break
        case "recentActivity":
          setData(dashboardData.recentActivity)
          break
        case "courseData":
          setData(dashboardData.courseData)
          break
        case "performanceData":
          setData(dashboardData.performanceData)
          break
        case "forumData":
          setData(dashboardData.forumData)
          break
        case "aiInsights":
          setData(dashboardData.aiInsights)
          break
        default:
          setData(dashboardData)
      }
    }
  }, [dashboardData, dataType])

  return { data, loading }
}

