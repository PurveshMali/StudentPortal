const mongoose = require('mongoose');

const educatorProfileSchema = new mongoose.Schema({
  currentEducation: String,
  institute: String,
  graduationYear: String,
  skills: [String],
  certifications: String,
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // ✅ THIS is what's causing the error during update if missing
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['learner', 'educator'],
    default: 'learner'
  },
  educatorProfile: educatorProfileSchema // ✅ Nested educator data
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
