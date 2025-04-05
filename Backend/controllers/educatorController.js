const Educator = require("../models/educator");
const User = require("../models/User");

exports.registerAsEducator = async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from JWT

    // Check if educator profile already exists
    const existingEducator = await Educator.findOne({ userId });
    if (existingEducator) {
      return res.status(400).json({ message: "Already registered as an educator." });
    }

    // Create new educator profile
    const newEducator = new Educator({
      userId,
      currentEducation: req.body.currentEducation,
      institute: req.body.institute,
      graduationYear: req.body.graduationYear,
      skills: req.body.skills,
      certifications: req.body.certifications
    });

    await newEducator.save();

    // Update user to mark as educator
    await User.findOneAndUpdate(
      { userId },
      { isEducator: true }
    );

    res.status(201).json({
      message: "Educator registered successfully.",
      educator: newEducator
    });
  } catch (err) {
    console.error("Educator register error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
