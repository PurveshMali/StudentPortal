const User = require('../models/User');

exports.getLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.find({})
      .sort({ 'monthly_activity.upvotes_received': -1 })
      .limit(10)
      .select('name role points monthly_activity');
    res.json(topUsers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error: err.message });
  }
};