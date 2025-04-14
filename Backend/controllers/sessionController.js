const Session = require("../models/Session");
const { v4: uuidv4 } = require("uuid");

// Create a new session (by educator)
exports.createSession = async (req, res) => {
  try {
    const meetingId = uuidv4();
    const session = await Session.create({
      topic: req.body.topic,
      educatorId: req.body.educatorId,
      scheduledAt: new Date(req.body.scheduledAt),
      meetingId,
      status: "upcoming",
      participants: [],
    });
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: "Session creation error", error });
  }
};

// Get sessions, with optional filtering by status
exports.getSessions = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const sessions = await Session.find(filter);
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving sessions", error });
  }
};

// Update session status (e.g. live, completed)
exports.updateSessionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSession = await Session.findByIdAndUpdate(
      id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedSession);
  } catch (error) {
    res.status(500).json({ message: "Error updating session", error });
  }
};

// Get all sessions available to students (live or upcoming within 30 minutes)
exports.getAvailableSessions = async (req, res) => {
  try {
    const now = new Date();
    const thirtyMinBefore = new Date(now.getTime() - 30 * 60 * 1000);

    const sessions = await Session.find({
      status: { $in: ["upcoming", "live"] },
      scheduledAt: { $gte: thirtyMinBefore },
    });

    res.json(sessions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching available sessions", error });
  }
};

// Student joins a session
exports.joinSession = async (req, res) => {
  const { meetingId, studentId } = req.body;
  console.log("JOIN REQUEST →", meetingId, studentId);

  try {
    const session = await Session.findOne({ meetingId });
    if (!session) {
      console.log("Session not found");
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    if (session.participants.includes(studentId)) {
      return res.status(200).json({ success: true, message: "Already joined" });
    }

    if (session.participants.length >= 10) {
      return res
        .status(403)
        .json({ success: false, message: "Session is full" });
    }

    session.participants.push(studentId);
    if (session.status === "upcoming") session.status = "live";

    await session.save();
    console.log("Participant added:", studentId);

    res.json({ success: true });
  } catch (error) {
    console.error("Join session error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error joining session", error });
  }
};

// Get all sessions created by a specific educator
exports.getSessionsByEducator = async (req, res) => {
  const { educatorId } = req.params;
  try {
    const sessions = await Session.find({ educatorId });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sessions", error });
  }
};
