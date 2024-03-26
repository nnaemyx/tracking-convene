const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Route for creating a comment under a specific question
router.post('/:questionId/comments', commentController.createComment);

module.exports = router;
