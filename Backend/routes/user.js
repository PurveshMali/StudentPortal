const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/user/unlock-educator
router.post('/unlock-educator', async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Update isEducator
    user.isEducator = true;

    // Append "educator" to role if not already there
    if (!user.role.includes('educator')) {
      if (user.role === 'learner') {
        user.role = 'learner|educator';
      } else {
        user.role += '|educator';
      }
    }

    await user.save();

    res.json({ message: 'Educator portal unlocked', user });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;