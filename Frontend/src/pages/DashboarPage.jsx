import Header from "../components/Header";
import LearningGoals from "../components/LearningGoals";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StateCard";
import WeeklyActivityChart from "../components/WeeklyActivityChart";

const DashboardPage = () => {
  const statsData = [
    { title: "Courses Enrolled", value: 12, change: "+8%", icon: "book" },
    { title: "Forum Points", value: 485, change: "+12%", icon: "chat" },
    { title: "Tutoring Sessions", value: 8, change: "+5%", icon: "education" },
    { title: "Achievements", value: 16, change: "+2%", icon: "medal" },
  ];

  const goalsData = [
    { title: "Complete Machine Learning Course", progress: 65 },
    { title: "Earn 1000 Forum Points", progress: 48 },
    { title: "Complete 10 Tutoring Sessions", progress: 80 },
    { title: "Contribute to Open Source Project", progress: 25 },
  ];
  return (
    <div className="flex">
      {/* Sidebar (Fixed Left) */}
      <Sidebar />

      {/* Main Content (Push to Right) */}
      <div className="flex-1 lg:ml-56 p-6">
        <Header />
        <h1 className="text-2xl font-bold mt-4">Welcome to Dashboard</h1>
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Dashboard
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Welcome back! Here's an overview of your learning journey.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {statsData.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Weekly Activity Chart */}
            <div className="lg:col-span-2 bg-white shadow-sm rounded-xl p-6">
              <WeeklyActivityChart />
            </div>

            {/* Learning Goals */}
            <div className="bg-white shadow-sm rounded-xl p-6">
              <LearningGoals goals={goalsData} />
            </div>
          </div>

          {/* My Courses Section */}
          <div className="bg-white shadow-sm rounded-xl p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                My Courses
              </h2>
              <a
                href="/courses"
                className="text-[#6E59A5] text-sm hover:underline"
              >
                View all
              </a>
            </div>
            {/* Course cards would go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
