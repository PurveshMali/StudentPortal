"use client";
import { useDashboardData } from "../hooks/useDashboardData";
import WidgetCard from "../components/WidgetCard";
import Chart from "../components/Chart";
import Table from "../components/Table";
import Loader from "../components/Loader";
import { Users, BookOpen, Award, BarChart2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Overview = () => {
  const { data: dashboardData, loading } = useDashboardData();

  if (loading || !dashboardData) {
    return <Loader />;
  }

  const { stats, recentActivity, performanceData } = dashboardData;

  const activityColumns = [
    { key: "user", label: "User" },
    { key: "action", label: "Action" },
    { key: "course", label: "Course" },
    { key: "time", label: "Time", sortable: true },
  ];

  const activityData = [
    { name: "Mon", Course: 2, Forum: 5, Tutoring: 1 },
    { name: "Tue", Course: 3, Forum: 7, Tutoring: 0 },
    { name: "Wed", Course: 5, Forum: 3, Tutoring: 2 },
    { name: "Thu", Course: 4, Forum: 8, Tutoring: 1 },
    { name: "Fri", Course: 6, Forum: 10, Tutoring: 0 },
    { name: "Sat", Course: 8, Forum: 4, Tutoring: 0 },
    { name: "Sun", Course: 7, Forum: 2, Tutoring: 1 },
  ];

  const goals = [
    { name: "Complete Machine Learning Course", progress: 65 },
    { name: "Earn 1000 Forum Points", progress: 48 },
    { name: "Complete 10 Tutoring Sessions", progress: 80 },
    { name: "Contribute to Open Source Project", progress: 25 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mt-4">Dashboard</h1>
        <p className="mb-6">
          Welcome back! Here's an overview of your learning journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <WidgetCard
            title="Courses Enrolled"
            value={stats.activeCourses.toLocaleString()}
            icon={Users}
            trend="up"
            trendValue="12% from last month"
          />
          <WidgetCard
            title="Forum Points"
            value={stats.forumPoints}
            icon={BookOpen}
            trend="up"
            trendValue="3 new courses"
          />
          <WidgetCard
            title="Tutoring Sessions"
            value={stats.tutoringSession}
            icon={Award}
            trend="up"
            trendValue="5% increase"
          />
          <WidgetCard
            title="Achievements"
            value={stats.achievements}
            icon={BarChart2}
            trend="down"
            trendValue="2 points"
          />
        </div>
      </div>

      <div className="grid grid-cols-[60%_40%] lg:grid-cols-[55%_45%] gap-6 text-[#5bd08f] h-100">
        {/* <Chart
          type="area"
          data={performanceData}
          title="Student & Course Growth"
          dataKeys={["students", "courses"]}
          colors={["#6E59A5", "#5bd08f"]}
        /> */}
        <ResponsiveContainer width="100%" height="100%">
          {/* <h1 className="text-2xl font-semibold text-black mb-4">Weekly Activity</h1> */}
          <BarChart data={activityData} barCategoryGap="20%" barSize={20}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 12]} tickCount={7} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Course" fill="#6A5ACD" name="Course" />
            <Bar dataKey="Forum" fill="#1E90FF" name="Forum" />
            <Bar dataKey="Tutoring" fill="#FF8C42" name="Tutoring" />
          </BarChart>
        </ResponsiveContainer>

        {/* <Table
          data={recentActivity}
          columns={activityColumns}
          title="Recent Activity"
          pagination={true}
          itemsPerPage={5}
        /> */}

<div className="mx-auto bg-white shadow-md rounded-xl p-5 w-125">
      <h2 className="text-2xl font-semibold text-black">Learning Goals</h2>
      <p className="text-gray-500 text-sm">Track your progress on set goals</p>
      <div className="mt-4 space-y-4">
        {goals.map((goal, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm font-base text-gray-500">
              <span>{goal.name}</span>
              <span>{goal.progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-300 rounded-full mt-1">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
      </div>
    </div>
  );
};

export default Overview;
