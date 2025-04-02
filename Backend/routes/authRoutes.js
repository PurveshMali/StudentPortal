const express = require('express');
const { signup, login, getMe, logout } = require('../controllers/authController');
const router = express.Router();

// User Signup (Registration)
router.post('/signup', signup);

// User Login
router.post('/login', login);

router.get('/me', getMe);

router.post('/logout', logout);
module.exports = router;
