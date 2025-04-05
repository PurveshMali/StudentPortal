const express = require("express");
const router = express.Router();
const leaderboardController = require("../controllers/leaderBoardController");

router.get("/", leaderboardController.getLeaderboard);

module.exports = router;
