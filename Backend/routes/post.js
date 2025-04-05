const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController'); // ✅ correct path?

router.post('/add', postController.createPost);
router.get('/all', postController.getAllPosts);

module.exports = router;
