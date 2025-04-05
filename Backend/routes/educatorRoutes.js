const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Educator = require('../models/educator');

// Route 1: Unlock educator portal (initial step)
router.post('/unlock-educator', async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findOne({ userId }); // ✅ Use UUID

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.educatorRequestInitiated = true; // Optional flag
    await user.save();

    res.status(200).json({ message: 'Educator registration form can be shown now' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route 2: Save educator personal details
router.post('/educator-form', async (req, res) => {
  const { userId, currentEducation, institute, graduationYear, skills, certifications } = req.body;
  try {
    const user = await User.findOne({ userId }); // ✅ Use UUID
    if (!user) return res.status(404).json({ message: 'User not found' });

    const existing = await Educator.findOne({ userId });
    if (existing) return res.status(400).json({ message: 'Educator form already submitted' });

    const newEducator = new Educator({
      userId,
      currentEducation,
      institute,
      graduationYear,
      skills,
      certifications
    });

    await newEducator.save();
    res.status(201).json({ message: 'Educator details submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to submit educator form' });
  }
});

// Route 3: Quiz submission & final approval
router.post('/educator-quiz/submit', async (req, res) => {
  const { userId, quizScore } = req.body;
  const PASSING_SCORE = 70;

  try {
    const user = await User.findOne({ userId }); // ✅ Use UUID
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (quizScore >= PASSING_SCORE) {
      user.isEducator = true;
      user.role = user.role === 'learner' ? 'learner | educator' : user.role;
      await user.save();

      return res.status(200).json({ message: 'Quiz passed! You are now an educator.' });
    } else {
      return res.status(200).json({ message: 'Quiz failed. Please try again later.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Quiz submission error' });
  }
});

module.exports = router;