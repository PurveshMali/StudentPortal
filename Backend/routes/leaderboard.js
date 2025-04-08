const express = require("express");
const router = express.Router();
const leaderBoardController = require("../controllers/leaderboardController");

// Route to get leaderboard data
router.get("/", leaderBoardController.getLeaderBoard);

module.exports = router;
