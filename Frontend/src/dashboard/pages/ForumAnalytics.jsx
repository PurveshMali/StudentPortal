"use client"
import { useDashboardData } from "../hooks/useDashboardData"
import Chart from "../components/Chart"
import Table from "../components/Table"
import WidgetCard from "../components/WidgetCard"
import Loader from "../components/Loader"
import { MessageSquare, Users, TrendingUp } from "lucide-react"

const ForumAnalytics = () => {
  const { data: dashboardData, loading } = useDashboardData()

  if (loading || !dashboardData) {
    return <Loader />
  }

  const { forumData } = dashboardData

  // Transform category engagement data for chart
  const categoryEngagementData = forumData.categoryEngagement.map((category) => ({
    name: category.category,
    posts: category.posts,
    engagement: category.engagement,
  }))

  // Monthly forum activity data
  const monthlyActivityData = [
    { month: "Jan", posts: 120, activeUsers: 85 },
    { month: "Feb", posts: 150, activeUsers: 95 },
    { month: "Mar", posts: 180, activeUsers: 110 },
    { month: "Apr", posts: 210, activeUsers: 130 },
    { month: "May", posts: 250, activeUsers: 150 },
    { month: "Jun", posts: 220, activeUsers: 140 },
    { month: "Jul", posts: 280, activeUsers: 160 },
  ]

  const contributorColumns = [
    { key: "name", label: "Name" },
    {
      key: "posts",
      label: "Posts",
      render: (value) => (
        <div className="flex items-center">
          <MessageSquare size={16} className="mr-2 text-gray-500" />
          {value}
        </div>
      ),
    },
    {
      key: "badge",
      label: "Badge",
      render: (_, user) => {
        let badge = "Bronze"
        let color = "bg-amber-600"

        if (user.posts > 80) {
          badge = "Gold"
          color = "bg-yellow-500"
        } else if (user.posts > 70) {
          badge = "Silver"
          color = "bg-gray-400"
        }

        return <span className={`px-2 py-1 rounded-full text-xs text-white ${color}`}>{badge}</span>
      },
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Forum Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <WidgetCard
          title="Total Posts"
          value={forumData.totalPosts.toLocaleString()}
          icon={MessageSquare}
          trend="up"
          trendValue="12% from last month"
        />
        <WidgetCard
          title="Active Threads"
          value={forumData.activeThreads}
          icon={TrendingUp}
          trend="up"
          trendValue="8 new threads"
        />
        <WidgetCard
          title="Active Contributors"
          value={forumData.topContributors.length}
          icon={Users}
          trend="up"
          trendValue="5 new contributors"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          type="bar"
          data={categoryEngagementData}
          title="Category Engagement"
          dataKeys={["posts", "engagement"]}
          colors={["#6E59A5", "#9B8ACA"]}
        />

        <Chart
          type="line"
          data={monthlyActivityData}
          title="Monthly Forum Activity"
          dataKeys={["posts", "activeUsers"]}
          colors={["#6E59A5", "#9B8ACA"]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Table data={forumData.topContributors} columns={contributorColumns} title="Top Contributors" />

        <div className="bg-white dark:bg-dark-card rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Forum Insights</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary"></div>
              <p className="ml-3 text-sm">Course Help is the most active category with 450 posts</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary"></div>
              <p className="ml-3 text-sm">85% of questions receive an answer within 24 hours</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary"></div>
              <p className="ml-3 text-sm">Students who participate in forums have 30% higher course completion rates</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary"></div>
              <p className="ml-3 text-sm">Peak forum activity occurs between 7-10 PM on weekdays</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary"></div>
              <p className="ml-3 text-sm">The top 10% of contributors create 40% of all forum content</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ForumAnalytics

