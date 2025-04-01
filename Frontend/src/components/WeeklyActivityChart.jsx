const WeeklyActivityChart = () => {
    const chartData = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        { label: "Course", data: [2, 3, 5, 4, 6, 8, 7], color: "#8875ff" },
        { label: "Forum", data: [5, 7, 3, 8, 10, 4, 2], color: "#4dabf7" },
        { label: "Tutoring", data: [1, 2, 2, 1, 1, 0, 1], color: "#ffa94d" },
      ],
    };
  
    const maxValue = Math.max(...chartData.datasets.flatMap(dataset => dataset.data));
  
    return (
      <div className="w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800">Weekly Activity</h2>
        <p className="text-sm text-gray-600 mb-4">Your engagement across different platform features</p>
  
        <div className="flex h-64 mb-4">
          <div className="flex flex-col justify-between pr-2 text-xs text-gray-500">
            {[...Array(5)].map((_, i) => (
              <div key={i}>{Math.round((maxValue * (4 - i)) / 4)}</div>
            ))}
          </div>
          
          <div className="flex flex-1 justify-between items-end border-l border-b border-gray-200 pt-5">
            {chartData.labels.map((day, dayIndex) => (
              <div key={dayIndex} className="flex flex-col items-center relative w-full h-52">
                {chartData.datasets.map((dataset, datasetIndex) => (
                  <div
                    key={datasetIndex}
                    className="w-4 mx-1 rounded-t-md"
                    style={{
                      height: `${(dataset.data[dayIndex] / maxValue) * 200}px`,
                      backgroundColor: dataset.color,
                    }}
                  ></div>
                ))}
                <div className="absolute -bottom-5 text-xs text-gray-600">{day}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-4">
          {chartData.datasets.map((dataset, index) => (
            <div key={index} className="flex items-center mx-4">
              <span className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: dataset.color }}></span>
              <span className="text-xs text-gray-600">{dataset.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default WeeklyActivityChart;