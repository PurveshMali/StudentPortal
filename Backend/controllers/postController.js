// controllers/postController.js

const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { title, content, tags, user } = req.body;

    if (!title || !content || !user) {
      return res.status(400).json({ message: 'Title, content, and user are required.' });
    }

    const post = await Post.create({ title, content, tags, user });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create post', error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name role').sort({ created_at: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch posts', error: err.message });
  }
};
