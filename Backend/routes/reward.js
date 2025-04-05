const express = require('express');
const router = express.Router();
const Reward = require('../models/Reward');

// Get all rewards for a user
router.get('/:userId', async (req, res) => {
  try {
    const rewards = await Reward.find({ user: req.params.userId }).sort({ issuedAt: -1 });
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching rewards', error: err.message });
  }
});

module.exports = router;
