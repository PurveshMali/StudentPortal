const StatCard = ({ title, value, change, icon, iconBgColor }) => {
    const isPositive = change.startsWith("+");
  
    return (
      <div className="bg-white rounded-lg p-5 flex justify-between items-center shadow-md">
        <div>
          <h3 className="text-sm text-gray-500 mb-2 font-normal">{title}</h3>
          <h2 className="text-2xl font-semibold text-gray-900">{value}</h2>
          <span
            className={`text-xs mt-1 block ${isPositive ? "text-green-500" : "text-red-500"}`}
          >
            {change} from last week
          </span>
        </div>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-purple-600"
          style={{ backgroundColor: iconBgColor }}
        >
          {icon === "book" && <i className="icon-book text-lg"></i>}
          {icon === "chat" && <i className="icon-chat text-lg"></i>}
          {icon === "education" && <i className="icon-education text-lg"></i>}
          {icon === "medal" && <i className="icon-medal text-lg"></i>}
        </div>
      </div>
    );
  };
  
  export default StatCard;