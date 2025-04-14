const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");

// Educator creates new session
router.post("/new-session", sessionController.createSession);

// Get sessions (e.g., for admin or educator view)
router.get("/get-session", sessionController.getSessions);

// Update session status (e.g., manually ending a session)
router.patch("/update-session/:id/status", sessionController.updateSessionStatus);

// Student gets all available sessions (live or upcoming)
router.get("/available-sessions", sessionController.getAvailableSessions);

// Student joins a session
router.post("/join", sessionController.joinSession);

// Get sessions created by a specific educator
router.get("/educator/:educatorId", sessionController.getSessionsByEducator);


module.exports = router;
