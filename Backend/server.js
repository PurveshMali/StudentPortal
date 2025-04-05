require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const learnerRoutes = require('./routes/learner');
const educatorRoutes = require('./routes/educatorRoutes');
const { authenticate, authorize } = require('./middleware/authMiddleware');
const path = require("path");
const rewardRoutes = require('./routes/reward');
const postRoutes = require('./routes/post');
const replyRoutes = require('./routes/replies');
const leaderboardRoutes = require('./routes/leaderboard');
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true, // Allows cookies to be sent
}));
// You can configure this as per your requirements

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/learner', learnerRoutes);
app.use("/api/educator", educatorRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/posts', postRoutes);
app.use('/api/replies', replyRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);

// Protected route example
app.get('/api/educator', authenticate, authorize(['educator']), (req, res) => {
  res.send('Welcome, Educator! You have access to this route.');
});

app.get('/api/learner', authenticate, authorize(['learner']), (req, res) => {
  res.send('Welcome, Learner! You have access to this route.');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully ✅'))
  .catch((err) => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀Server running on port ${PORT}`));
