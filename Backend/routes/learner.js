const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// 📌 GET all global courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find().populate('educator', 'name');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Apply to a course
router.post('/apply/:courseId', authenticate, authorize(['learner']), async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const userId = req.user.id;
  
      const course = await Course.findById(courseId);
  
      if (!course) return res.status(404).json({ message: 'Course not found' });
  
      // Check if already applied
      if (course.applicants.includes(userId)) {
        return res.status(400).json({ message: 'You already applied to this course' });
      }
  
      course.applicants.push(userId);
      await course.save();
  
      res.status(200).json({ message: 'Successfully applied to course', course });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong', details: err.message });
    }
  });
  
  module.exports = router;