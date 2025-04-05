const User = require("../models/User");

// Store educator profile
exports.becomeEducator = async (req, res) => {
  const { currentEducation, institute, graduationYear, skills, certifications } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Add the educatorProfile directly
    user.educatorProfile = {
      currentEducation,
      institute,
      graduationYear,
      skills,
      certifications
    };

    await user.save({ validateModifiedOnly: true }); // ✅ Prevent full validation error

    res.status(200).json({ message: "Educator profile saved. Proceed to skill quiz." });

  } catch (error) {
    console.error("🔥 ERROR in becomeEducator:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Load quiz questions
exports.loadQuiz = async (req, res) => {
  const skill = req.query.skill;

  const quizzes = {
    ML: [
      { question: "What is supervised learning?", options: ["A", "B", "C", "D"], answer: "A" },
      { question: "What is overfitting?", options: ["A", "B", "C", "D"], answer: "B" },
    ],
    Web: [
      { question: "What does HTML stand for?", options: ["A", "B", "C", "D"], answer: "A" },
    ],
  };

  const quiz = quizzes[skill];
  if (!quiz) return res.status(404).json({ message: "Quiz not found for the selected skill" });

  res.status(200).json({ quiz });
};

// Evaluate quiz
exports.evaluateQuiz = async (req, res) => {
  const { answers, skill } = req.body;

  const correctAnswers = {
    ML: ["A", "B", "C", "D", "A", "B", "C", "D", "A", "B"],
    Web: ["A", "C", "B", "D", "A", "C", "B", "D", "A", "C"],
  };

  const expected = correctAnswers[skill];
  if (!expected) return res.status(400).json({ message: "Invalid skill selected." });

  let score = 0;
  for (let i = 0; i < expected.length; i++) {
    if (answers[i] === expected[i]) score++;
  }

  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (score >= 7) {
      user.role = "educator";
      await user.save({ validateModifiedOnly: true });
      return res.status(200).json({ message: "Congrats! You are now an educator.", score });
    } else {
      return res.status(200).json({ message: "Score too low to become educator.", score });
    }
  } catch (error) {
    console.error("🔥 ERROR in evaluateQuiz:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
