const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  educatorId: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
  status: {
    type: String,
    enum: ["upcoming", "live", "finished"],
    default: "upcoming",
  },
  participants: {
    type: [String], // must be defined as an array of strings
    default: [],
  }, // store the participant IDs (or further details if needed)
  meetingId: { type: String, required: true }, // unique meeting identifier generated when session is created
});

module.exports = mongoose.model("Session", sessionSchema);
