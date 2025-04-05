const Course = require("../models/Course");
const User = require("../models/User");

exports.createCourse = async (req, res) => {
  const { title, description, videos, notes } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== "educator") {
      return res.status(403).json({ message: "Only educators can create courses." });
    }

    const course = await Course.create({
      educator: req.user.userId,
      title,
      description,
      videos,
      notes
    });

    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    console.error("🔥 ERROR in createCourse:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};