"use client"
import { useTheme } from "../context/ThemeContext"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const Chart = ({ type, data, title, dataKeys, colors }) => {
  const { theme } = useTheme()

  const renderChart = () => {
    switch (type) {
      case "area":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                {dataKeys.map((key, index) => (
                  <linearGradient key={key} id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors[index]} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={colors[index]} stopOpacity={0.1} />
                  </linearGradient>
                ))}
              </defs>
              <XAxis dataKey="month" tick={{ fill: theme === "dark" ? "#E9E7FF" : "#333" }} />
              <YAxis tick={{ fill: theme === "dark" ? "#E9E7FF" : "#333" }} />
              <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#444" : "#eee"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#2A2A3C" : "#fff",
                  borderColor: theme === "dark" ? "#444" : "#ddd",
                  color: theme === "dark" ? "#E9E7FF" : "#333",
                }}
              />
              <Legend />
              {dataKeys.map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index]}
                  fillOpacity={1}
                  fill={`url(#color${key})`}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        )

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fill: theme === "dark" ? "#E9E7FF" : "#333" }} />
              <YAxis tick={{ fill: theme === "dark" ? "#E9E7FF" : "#333" }} />
              <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#444" : "#eee"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#2A2A3C" : "#fff",
                  borderColor: theme === "dark" ? "#444" : "#ddd",
                  color: theme === "dark" ? "#E9E7FF" : "#333",
                }}
              />
              <Legend />
              {dataKeys.map((key, index) => (
                <Bar key={key} dataKey={key} fill={colors[index]} radius={[4, 4, 0, 0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )

      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="month" tick={{ fill: theme === "dark" ? "#E9E7FF" : "#333" }} />
              <YAxis tick={{ fill: theme === "dark" ? "#E9E7FF" : "#333" }} />
              <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#444" : "#eee"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#2A2A3C" : "#fff",
                  borderColor: theme === "dark" ? "#444" : "#ddd",
                  color: theme === "dark" ? "#E9E7FF" : "#333",
                }}
              />
              <Legend />
              {dataKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index]}
                  strokeWidth={2}
                  dot={{ r: 4, fill: colors[index], strokeWidth: 1 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey={dataKeys[0]}
                nameKey="name"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#2A2A3C" : "#fff",
                  borderColor: theme === "dark" ? "#444" : "#ddd",
                  color: theme === "dark" ? "#E9E7FF" : "#333",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )

      default:
        return <div>Chart type not supported</div>
    }
  }

  return (
    <div
      className={`rounded-lg p-6 ${
        theme === "dark" ? "bg-dark-card text-primary-foreground" : "bg-white text-gray-800"
      } shadow-sm border ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
    >
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      {renderChart()}
    </div>
  )
}

export default Chart

