const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Load JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT and extract user information
exports.authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Middleware to authorize based on user role
exports.authorize = (roles) => {
  return (req, res, next) => {
    if (req.user && req.user.role && roles.includes(req.user.role)) {
      next(); // User is authorized
    } else {
      res.status(403).json({ message: 'Forbidden: You do not have access to this resource.' });
    }
  };
};



