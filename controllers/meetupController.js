const Meetup = require('../models/meetupModel');
const Question = require('../models/questionModel');

const meetupController = {
  createMeetup: async (req, res) => {
    const { title, description } = req.body;
    try {
      const meetup = await Meetup.create({ title, description });
      res.status(201).json({ status: 201, data: meetup });
    } catch (error) {
      console.error('Error creating meetup:', error);
      res.status(500).json({ status: 500, error: 'Internal server error' });
    }
  },

  createQuestion: async (req, res) => {
    const meetupId = req.params.meetupId;
    const { question } = req.body;
    try {
      const newQuestion = await Question.create({ meetup: meetupId, question });
      res.status(201).json({ status: 201, data: newQuestion });
    } catch (error) {
      console.error('Error creating question:', error);
      res.status(500).json({ status: 500, error: 'Internal server error' });
    }
  },

  upvoteQuestion: async (req, res) => {
    const meetupId = req.params.meetupId;
    const questionId = req.params.questionId;
    try {
      const question = await Question.findOneAndUpdate(
        { _id: questionId, meetup: meetupId },
        { $inc: { upvotes: 1 } },
        { new: true }
      );
      if (question) {
        res.status(200).json({ status: 200, data: question });
      } else {
        res.status(404).json({ status: 404, error: 'Question not found' });
      }
    } catch (error) {
      console.error('Error upvoting question:', error);
      res.status(500).json({ status: 500, error: 'Internal server error' });
    }
  },

  downvoteQuestion: async (req, res) => {
    const meetupId = req.params.meetupId;
    const questionId = req.params.questionId;
    try {
      const question = await Question.findOneAndUpdate(
        { _id: questionId, meetup: meetupId },
        { $inc: { downvotes: 1 } },
        { new: true }
      );
      if (question) {
        res.status(200).json({ status: 200, data: question });
      } else {
        res.status(404).json({ status: 404, error: 'Question not found' });
      }
    } catch (error) {
      console.error('Error downvoting question:', error);
      res.status(500).json({ status: 500, error: 'Internal server error' });
    }
  }

  
};

module.exports = meetupController;
