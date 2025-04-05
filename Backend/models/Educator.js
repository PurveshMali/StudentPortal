const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const educatorSchema = new mongoose.Schema({
  educatorId: {
    type: String,
    default: uuidv4,
    unique: true
  },
  userId: {
    type: String, // UUID from User model
    required: true,
    ref: "User"
  },
  currentEducation: String,
  institute: String,
  graduationYear: Number,
  skills: [String],
  certifications: String
});

module.exports = mongoose.model("Educator", educatorSchema);
