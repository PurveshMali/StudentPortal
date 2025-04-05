const mongoose = require("mongoose");

const educatorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  currentEducation: String,
  institute: String,
  graduationYear: Number,
  skills: [String],
  certifications: String,
});

module.exports = mongoose.model("EducatorProfile", educatorSchema);
