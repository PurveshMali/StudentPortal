// routes/forumRoutes.js
const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), forumController.uploadPost);
router.get('/posts', forumController.getAllPosts);

module.exports = router;