const express = require("express");
const router = express.Router();

const { authenticate, authorize } = require("../middleware/authMiddleware");
const { createCourse } = require("../controllers/courseController");

router.post("/add", authenticate, authorize(["educator"]), createCourse);


module.exports = router;