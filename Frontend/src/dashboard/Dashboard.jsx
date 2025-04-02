"use client";
import ProtectedRoute from "./context/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";
import DashboardLayout from "./layout/DashboardLayout";

const Dashboard = () => {
  return (
    <ThemeProvider>
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    </ThemeProvider>
  );
};

export default Dashboard;
