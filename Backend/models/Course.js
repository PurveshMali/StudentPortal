const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  educator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Educator's ID
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Learner IDs
});

module.exports = mongoose.model('Course', courseSchema);
