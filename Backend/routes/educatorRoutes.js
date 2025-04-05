const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  becomeEducator,
  loadQuiz,
  evaluateQuiz,
} = require("../controllers/educatorController");

// 👇 Add `upload.single("certificate")`
router.post("/become", authenticate, upload.single("certificate"), becomeEducator);
router.get("/quiz", authenticate, loadQuiz);
router.post("/evaluate", authenticate, evaluateQuiz);

module.exports = router;
