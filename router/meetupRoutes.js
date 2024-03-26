const express = require('express');
const router = express.Router();
const meetupController = require('../controllers/meetupController');
const commentRoutes = require('./commentRoutes');

// Routes for meetups
router.post('/', meetupController.createMeetup);
router.post('/:meetupId/questions', meetupController.createQuestion);
router.post('/:meetupId/questions/:questionId/upvote', meetupController.upvoteQuestion);
router.post('/:meetupId/questions/:questionId/downvote', meetupController.downvoteQuestion);
router.use('/:meetupId/questions', commentRoutes);

module.exports = router;
