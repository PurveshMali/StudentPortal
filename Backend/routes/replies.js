const express = require('express');
const router = express.Router();
const Reply = require('../models/Reply');
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { content, postId, userId } = req.body;
  const reply = await Reply.create({ content, post: postId, user: userId });

  // Increase user's monthly reply count
  await User.findByIdAndUpdate(userId, {
    $inc: { 'monthly_activity.replies': 1 },
    $set: { 'monthly_activity.last_active': new Date() }
  });

  res.status(201).json(reply);
});

router.post('/:id/upvote', async (req, res) => {
  const reply = await Reply.findById(req.params.id);
  reply.upvotes += 1;
  await reply.save();

  // Increase user's monthly upvotes
  await User.findByIdAndUpdate(reply.user, {
    $inc: { 'monthly_activity.upvotes_received': 1, points: 10 }
  });

  res.json({ success: true });
});

module.exports = router;
