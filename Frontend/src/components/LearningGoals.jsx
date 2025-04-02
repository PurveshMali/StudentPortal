const LearningGoals = ({ goals = [] }) => {
    return (
      <div className="w-full p-4">
        <h2 className="text-xl font-bold text-gray-800">Learning Goals</h2>
        <p className="text-sm text-gray-600">Track your progress on set goals</p>
  
        <div className="mt-4 space-y-4">
          {goals.length > 0 ? (
            goals.map((goal, index) => {
              const progress = Math.max(0, Math.min(goal.progress, 100)); // Ensure valid range
  
              return (
                <div key={index} className="p-3 bg-white rounded-lg shadow">
                  <div className="flex justify-between text-sm font-medium text-gray-700">
                    <span>{goal.title}</span>
                    <span className="text-[#6E59A5]">{progress}%</span>
                  </div>
                  <div className="w-full h-2 mt-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#6E59A3] to-[#6E59A5] transition-all duration-300"
                      style={{ width: `${progress}%` }}
                      role="progressbar"
                      aria-valuenow={progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-live="polite"
                    ></div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center">No goals set yet.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default LearningGoals;
  