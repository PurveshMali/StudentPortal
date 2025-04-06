const mongoose = require('mongoose');

const educatorSchema = new mongoose.Schema({
  educatorId: {
    type: String,
    unique: true,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: String,
  bio: String,
  skills: [String], // ✅ This is the updated field
  experience: Number,
  profilePicture: String,
}, { timestamps: true });


module.exports = mongoose.model('Educator', educatorSchema);