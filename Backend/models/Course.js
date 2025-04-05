const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true }
});

const noteSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true }
});

const courseSchema = new mongoose.Schema({
  educator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  videos: [videoSchema],
  notes: [noteSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Course", courseSchema);