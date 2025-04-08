// models/forumModel.js
const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['doubt', 'material'], required: true },
  description: String,
  uploadedBy: {
    name: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  fileUrl: String, // Optional: for material uploads
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Forum', forumSchema);