"use client"
import { useDashboardData } from "../hooks/useDashboardData"
import WidgetCard from "../components/WidgetCard"
import Loader from "../components/Loader"
import { Lightbulb, TrendingUp, AlertTriangle, Zap } from "lucide-react"

const AIInsights = () => {
  const { data: dashboardData, loading } = useDashboardData()

  if (loading || !dashboardData) {
    return <Loader />
  }

  const { aiInsights } = dashboardData

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">AI-Powered Insights</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <WidgetCard
          title="Enrollment Trend"
          value={aiInsights.predictions.enrollmentTrend}
          icon={TrendingUp}
          trend="up"
          trendValue="Positive outlook"
        />
        <WidgetCard
          title="Completion Forecast"
          value={aiInsights.predictions.completionRateForecast}
          icon={Zap}
          trend="up"
          trendValue="Maintaining levels"
        />
        <WidgetCard
          title="Challenge Areas"
          value={aiInsights.predictions.challengeAreas.length}
          icon={AlertTriangle}
          trend="down"
          trendValue="Needs attention"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-card rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center mb-4">
            <Lightbulb className="w-6 h-6 text-primary mr-2" />
            <h3 className="text-lg font-medium">Recommendations</h3>
          </div>
          <ul className="space-y-4">
            {aiInsights.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary"></div>
                <p className="ml-3">{recommendation}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />
            <h3 className="text-lg font-medium">Areas Needing Attention</h3>
          </div>

          <div className="space-y-4">
            {aiInsights.predictions.challengeAreas.map((area, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
              >
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200">{area}</h4>
                <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                  {index === 0
                    ? "Students are struggling with complex mathematical concepts. Consider adding more visual explanations and practice exercises."
                    : "This course has a higher than average dropout rate. Consider revising the curriculum structure and adding more support resources."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-card rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Predictive Analytics</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Student Success Factors</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="w-1 h-8 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Forum Participation</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">30% higher completion rate</p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="w-1 h-8 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Practice Exercises</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">25% better test scores</p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="w-1 h-8 bg-purple-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Video Content</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">2x higher engagement</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Enrollment Forecasts</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="w-1 h-8 bg-primary rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Computer Science</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Expected 15% growth</p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="w-1 h-8 bg-primary-hover rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Data Science</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Expected 20% growth</p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="w-1 h-8 bg-primary-background rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Physics</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Expected 5% growth</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIInsights

