const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true, default: uuidv4 }, // ✅ Add this
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  role:      { type: String, enum: ['learner', 'educator', 'learner | educator'], default: 'learner' },
  isEducator: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);