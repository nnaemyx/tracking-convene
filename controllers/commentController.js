const Comment = require('../models/commentModel');

const commentController = {
  createComment: async (req, res) => {
    const { questionId } = req.params;
    const { userId, text } = req.body;

    try {
      const newComment = await Comment.create({
        question: questionId,
        user: userId,
        text,
      });

      res.status(201).json({ status: 201, data: newComment });
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ status: 500, error: 'Internal server error' });
    }
  },
};

module.exports = commentController;
