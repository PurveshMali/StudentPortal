"use client"
import { useTheme } from "../context/ThemeContext"

const WidgetCard = ({ title, value, icon: Icon, trend, trendValue, className }) => {
  const { theme } = useTheme()

  return (
    <div
      className={`rounded-lg p-6 ${
        theme === "dark" ? "bg-dark-card text-primary-foreground" : "bg-white text-gray-800"
      } shadow-sm border ${theme === "dark" ? "border-gray-700" : "border-gray-200"} ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>

          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
              <span className="mr-1">{trend === "up" ? "↑" : "↓"}</span>
              <span>{trendValue}</span>
            </div>
          )}
        </div>

        {Icon && (
          <div className={`p-3 rounded-full ${theme === "dark" ? "bg-primary-hover/20" : "bg-primary-background"}`}>
            <Icon className="w-6 h-6 text-primary" />
          </div>
        )}
      </div>
    </div>
  )
}

export default WidgetCard

