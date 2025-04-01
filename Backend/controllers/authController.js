const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Load JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// User Registration (Sign Up)
exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'learner',  // Default role is learner
    });

    await newUser.save();

    // Create JWT token
    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '1h' });

    // Send token in cookies
    res.cookie('token', token, { httpOnly: true });

    return res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    // Send token in cookies
    res.cookie('token', token, { httpOnly: true });

    return res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
