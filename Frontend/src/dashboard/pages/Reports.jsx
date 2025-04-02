"use client"

import { useState } from "react"
import { useDashboardData } from "../hooks/useDashboardData"
import Chart from "../components/Chart"
import Table from "../components/Table"
import Loader from "../components/Loader"
import { Download, Calendar, Filter } from "lucide-react"

const Reports = () => {
  const { data: dashboardData, loading } = useDashboardData()
  const [reportType, setReportType] = useState("performance")
  const [timeRange, setTimeRange] = useState("6months")

  if (loading || !dashboardData) {
    return <Loader />
  }

  const { performanceData, courseData } = dashboardData

  // Filter data based on time range
  const filteredPerformanceData = (() => {
    switch (timeRange) {
      case "3months":
        return performanceData.slice(-3)
      case "6months":
        return performanceData.slice(-6)
      case "1year":
        return performanceData
      default:
        return performanceData
    }
  })()

  // Course completion data for pie chart
  const courseCompletionData = [
    { name: "High (80%+)", value: courseData.filter((c) => c.completion >= 80).length },
    { name: "Medium (60-79%)", value: courseData.filter((c) => c.completion >= 60 && c.completion < 80).length },
    { name: "Low (< 60%)", value: courseData.filter((c) => c.completion < 60).length },
  ]

  // Student performance data
  const studentPerformanceData = [
    { name: "A (90-100%)", students: 320 },
    { name: "B (80-89%)", students: 480 },
    { name: "C (70-79%)", students: 280 },
    { name: "D (60-69%)", students: 120 },
    { name: "F (< 60%)", students: 45 },
  ]

  const renderReportContent = () => {
    switch (reportType) {
      case "performance":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Chart
              type="line"
              data={filteredPerformanceData}
              title="Student Performance Over Time"
              dataKeys={["students"]}
              colors={["#6E59A5"]}
            />
            <Chart
              type="bar"
              data={studentPerformanceData}
              title="Grade Distribution"
              dataKeys={["students"]}
              colors={["#6E59A5"]}
            />
          </div>
        )
      case "courses":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Chart
              type="pie"
              data={courseCompletionData}
              title="Course Completion Rates"
              dataKeys={["value"]}
              colors={["#6E59A5", "#9B8ACA", "#C7BFE4"]}
            />
            <Table
              data={courseData.sort((a, b) => b.completion - a.completion).slice(0, 5)}
              columns={[
                { key: "name", label: "Course Name" },
                { key: "students", label: "Students" },
                {
                  key: "completion",
                  label: "Completion",
                  render: (value) => `${value}%`,
                },
                { key: "rating", label: "Rating" },
              ]}
              title="Top Performing Courses"
            />
          </div>
        )
      case "engagement":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Chart
              type="area"
              data={filteredPerformanceData}
              title="Student Engagement Trends"
              dataKeys={["students", "courses"]}
              colors={["#6E59A5", "#9B8ACA"]}
            />
            <div className="bg-white dark:bg-dark-card rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-medium mb-4">Engagement Insights</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary"></div>
                  <p className="ml-3 text-sm">Student engagement increased by 15% in the last quarter</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary"></div>
                  <p className="ml-3 text-sm">Course completion rates are highest in Computer Science</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary"></div>
                  <p className="ml-3 text-sm">
                    Students who participate in forums are 30% more likely to complete courses
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary"></div>
                  <p className="ml-3 text-sm">Video content has 2x higher engagement than text-based content</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary"></div>
                  <p className="ml-3 text-sm">Weekend activity accounts for 40% of total platform usage</p>
                </li>
              </ul>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <button className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover">
          <Download size={18} className="mr-2" />
          Export Report
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <Filter size={20} className="mr-2 text-gray-500" />
          <span className="text-sm font-medium mr-2">Report Type:</span>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="p-2 rounded-md bg-white dark:bg-dark-card border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="performance">Student Performance</option>
            <option value="courses">Course Analytics</option>
            <option value="engagement">Engagement Metrics</option>
          </select>
        </div>

        <div className="flex items-center">
          <Calendar size={20} className="mr-2 text-gray-500" />
          <span className="text-sm font-medium mr-2">Time Range:</span>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="p-2 rounded-md bg-white dark:bg-dark-card border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
        </div>
      </div>

      {renderReportContent()}
    </div>
  )
}

export default Reports

