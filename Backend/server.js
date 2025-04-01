require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { authenticate, authorize } = require('./middleware/authMiddleware');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors()); // You can configure this as per your requirements

// Routes
app.use('/api/auth', authRoutes);

// Protected route example
app.get('/api/educator', authenticate, authorize(['educator']), (req, res) => {
  res.send('Welcome, Educator! You have access to this route.');
});

app.get('/api/learner', authenticate, authorize(['learner']), (req, res) => {
  res.send('Welcome, Learner! You have access to this route.');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
