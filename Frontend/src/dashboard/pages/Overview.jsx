"use client";

import { useDashboardData } from "../hooks/useDashboardData";
import WidgetCard from "../components/WidgetCard";
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

  const { stats } = dashboardData;

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
    <div className="space-y-6 bg-black min-h-screen p-6 text-white">
      {/* Header and Widgets */}
      <div>
        <h1 className="text-2xl font-bold mt-4 text-white">Dashboard</h1>
        <p className="mb-6 text-gray-400">Welcome back! Here's an overview of your learning journey.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <WidgetCard
            title="Courses Enrolled"
            value={stats.activeCourses.toLocaleString()}
            icon={Users}
            trend="up"
            trendValue="12% from last month"
            dark
          />
          <WidgetCard
            title="Forum Points"
            value={stats.forumPoints}
            icon={BookOpen}
            trend="up"
            trendValue="3 new courses"
            dark
          />
          <WidgetCard
            title="Tutoring Sessions"
            value={stats.tutoringSession}
            icon={Award}
            trend="up"
            trendValue="5% increase"
            dark
          />
          <WidgetCard
            title="Achievements"
            value={stats.achievements}
            icon={BarChart2}
            trend="down"
            trendValue="2 points"
            dark
          />
        </div>
      </div>

      {/* Chart + Learning Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6">
        <div className="bg-gray-800 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Weekly Activity</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={activityData} barCategoryGap="20%" barSize={20}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis domain={[0, 12]} tickCount={7} stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderColor: "#444" }} labelStyle={{ color: "#fff" }} />
              <Legend wrapperStyle={{ color: "#fff" }} />
              <Bar dataKey="Course" fill="#7B68EE" name="Course" />
              <Bar dataKey="Forum" fill="#00BFFF" name="Forum" />
              <Bar dataKey="Tutoring" fill="#FFA500" name="Tutoring" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 shadow-md rounded-xl p-5">
          <h2 className="text-xl font-semibold">Learning Goals</h2>
          <p className="text-gray-400 text-sm">Track your progress on set goals</p>
          <div className="mt-4 space-y-4">
            {goals.map((goal, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm font-medium text-gray-300">
                  <span>{goal.name}</span>
                  <span>{goal.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full mt-1">
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
