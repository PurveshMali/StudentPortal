// models/Reply.js
const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  content: String,
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  upvotes: { type: Number, default: 0 },
  isBestAnswer: { type: Boolean, default: false }, // ✅ NEW FIELD
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Reply', replySchema);
