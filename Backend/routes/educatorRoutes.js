const express = require('express');
const router = express.Router();
const { unlockEducator } = require('../controllers/educatorController');

router.post('/unlock', unlockEducator);

module.exports = router;