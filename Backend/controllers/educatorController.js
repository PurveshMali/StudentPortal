const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const Educator = require('../models/Educator');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

exports.unlockEducator = async (req, res) => {
    console.log("abc---------------")
  try {
    // 🔐 1. Read token from cookies
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // 🔓 2. Verify and decode token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid token.' });
    }

    console.log('Decoded token:', decoded);

    // 👤 3. Get user from DB using decoded ID
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const userId = user._id;

    // ✅ 4. Destructure other fields from body
    const { name, bio, skills, experience, profilePicture } = req.body;

    // ❌ 5. Check if educator already exists
    const existing = await Educator.findOne({ userId });
    if (existing) {
      return res.status(400).json({ message: 'Educator profile already exists' });
    }

    // ✅ 6. Create new Educator
    const newEducator = new Educator({
      educatorId: uuidv4(),
      userId,
      name,
      bio,
      skills,
      experience,
      profilePicture
    });

    await newEducator.save();

    // 📦 7. Return response
    res.status(201).json({ message: 'Educator unlocked successfully', educator: newEducator });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
