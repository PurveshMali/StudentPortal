// controllers/replyController.js
const Reply = require('../models/Reply');

exports.markBestAnswer = async (req, res) => {
  try {
    const { replyId } = req.params;

    // Find the reply
    const selectedReply = await Reply.findById(replyId).populate("post");

    if (!selectedReply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    // Unmark all other replies for the same post
    await Reply.updateMany(
      { post: selectedReply.post._id, _id: { $ne: replyId } },
      { $set: { isBestAnswer: false } }
    );

    // Mark this reply as best
    selectedReply.isBestAnswer = true;
    await selectedReply.save();

    res.status(200).json({ message: 'Marked as best answer ✅' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error marking best answer', error: error.message });
  }
};
