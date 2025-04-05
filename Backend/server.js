require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require("path");

const authRoutes = require('./routes/authRoutes');
const learnerRoutes = require('./routes/learner');
const educatorRoutes = require('./routes/educatorRoutes');
const { authenticate, authorize } = require('./middleware/authMiddleware');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Debug log to verify routes
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/learner', learnerRoutes);
app.use('/api/educator', educatorRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Sample protected routes
app.get('/api/educator', authenticate, authorize(['educator']), (req, res) => {
  res.send('Welcome, Educator!');
});

app.get('/api/learner', authenticate, authorize(['learner']), (req, res) => {
  res.send('Welcome, Learner!');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
