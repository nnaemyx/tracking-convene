const express = require('express');
const router = express.Router();
const meetupController = require('../controllers/meetupController');
const commentRoutes = require('./commentRoutes');

// Routes for meetups
router.get('/', meetupController.getMeetups); // Get all meetups
router.post('/', meetupController.createMeetup); // Create a new meetup
// router.get('/:meetupId', meetupController.getMeetup); // Get a single meetup
router.delete('/:meetupId', meetupController.deleteMeetup); // Delete a meetup
router.post('/:meetupId/questions', meetupController.createQuestion);
router.post('/:meetupId/questions/:questionId/upvote', meetupController.upvoteQuestion);
router.post('/:meetupId/questions/:questionId/downvote', meetupController.downvoteQuestion);
router.use('/:meetupId/questions', commentRoutes);

module.exports = router;
