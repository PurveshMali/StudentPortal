const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

// User Signup (Registration)
router.post('/signup', signup);

// User Login
router.post('/login', login);

module.exports = router;
