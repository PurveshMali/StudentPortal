const User = require('../models/User');

const rewardTopSolver = async () => {
  const activeUsers = await User.find({ 'monthly_activity.replies': { $gte: 5 } });

  const topSolver = activeUsers.sort((a, b) =>
    b.monthly_activity.upvotes_received - a.monthly_activity.upvotes_received
  )[0];

  if (topSolver) {
    topSolver.badges.push('Query Solver of the Month');
    topSolver.points += 200; // Bonus
    await topSolver.save();
  }

  // Reset everyone's monthly activity
  await User.updateMany({}, {
    $set: {
      'monthly_activity.replies': 0,
      'monthly_activity.upvotes_received': 0
    }
  });

  console.log("Monthly rewards evaluated.");
};

module.exports = rewardTopSolver;
