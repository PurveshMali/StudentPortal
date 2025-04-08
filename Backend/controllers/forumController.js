// controllers/forumController.js
const Forum = require('../models/forumModel');
const path = require('path');

exports.uploadPost = async (req, res) => {
  try {
    const { title, type, description, userId, name } = req.body;
    const fileUrl = req.file ? req.file.path : null;

    const newPost = new Forum({
      title,
      type,
      description,
      uploadedBy: { userId, name },
      fileUrl,
    });

    await newPost.save();
    res.status(201).json({ message: 'Post uploaded successfully', newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload post' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Forum.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};