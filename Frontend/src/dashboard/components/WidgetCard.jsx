"use client";

const WidgetCard = ({ title, value, icon: Icon, trend, trendValue, className }) => {
  return (
    <div
      className={`group hover:translate-y-[-5px] transition-all ease-in-out hover:shadow-xl 
        rounded-lg p-6 bg-[#1c1c1e] text-white shadow-sm border border-gray-700 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>

          {trend && (
            <div
              className={`flex items-center mt-2 text-sm ${
                trend === "up" ? "text-green-400" : "text-red-400"
              }`}
            >
              <span className="mr-1">{trend === "up" ? "↑" : "↓"}</span>
              <span>{trendValue}</span>
            </div>
          )}
        </div>

        {Icon && (
          <div className="p-3 rounded-full bg-purple-900/20">
            <Icon className="group-hover:scale-130 group-hover:rotate-11 group-hover:text-purple-400 transition-all ease-in-out w-6 h-6 text-purple-400" />
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetCard;
