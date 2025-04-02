"use client"
import { useDashboardData } from "../hooks/useDashboardData"
import WidgetCard from "../components/WidgetCard"
import Chart from "../components/Chart"
import Table from "../components/Table"
import Loader from "../components/Loader"
import { Users, BookOpen, Award, BarChart2 } from "lucide-react"

const Overview = () => {
  const { data: dashboardData, loading } = useDashboardData()

  if (loading || !dashboardData) {
    return <Loader />
  }

  const { stats, recentActivity, performanceData } = dashboardData

  const activityColumns = [
    { key: "user", label: "User" },
    { key: "action", label: "Action" },
    { key: "course", label: "Course" },
    { key: "time", label: "Time", sortable: true },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <WidgetCard
            title="Total Students"
            value={stats.totalStudents.toLocaleString()}
            icon={Users}
            trend="up"
            trendValue="12% from last month"
          />
          <WidgetCard
            title="Active Courses"
            value={stats.activeCourses}
            icon={BookOpen}
            trend="up"
            trendValue="3 new courses"
          />
          <WidgetCard
            title="Completion Rate"
            value={`${stats.completionRate}%`}
            icon={Award}
            trend="up"
            trendValue="5% increase"
          />
          <WidgetCard
            title="Average Grade"
            value={stats.averageGrade}
            icon={BarChart2}
            trend="down"
            trendValue="2 points"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-[#5bd08f]">
        <Chart
          type="area"
          data={performanceData}
          title="Student & Course Growth"
          dataKeys={["students", "courses"]}
          colors={["#6E59A5", "#5bd08f"]}
        />

        <Table
          data={recentActivity}
          columns={activityColumns}
          title="Recent Activity"
          pagination={true}
          itemsPerPage={5}
        />
      </div>
    </div>
  )
}

export default Overview

