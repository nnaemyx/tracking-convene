// Import necessary modules
const { meetups, questions } = require('../data');

// Controller functions
const meetupController = {
  createMeetup: (req, res) => {
    const { title, description } = req.body;
    const meetup = { id: meetups.length + 1, title, description };
    meetups.push(meetup);
    res.json({ status: 201, data: meetup });
  },

  createQuestion: (req, res) => {
    const meetupId = parseInt(req.params.meetupId);
    const { question } = req.body;
    const questionId = Object.keys(questions).length + 1;
    if (!questions[meetupId]) {
      questions[meetupId] = [];
    }
    questions[meetupId].push({ id: questionId, question, upvotes: 0, downvotes: 0 });
    res.json({ status: 201, data: questions[meetupId] });
  },

  upvoteQuestion: (req, res) => {
    const meetupId = parseInt(req.params.meetupId);
    const questionId = parseInt(req.params.questionId);
    const meetupQuestions = questions[meetupId];
    const question = meetupQuestions.find(q => q.id === questionId);
    if (question) {
      question.upvotes++;
      res.json({ status: 200, data: question });
    } else {
      res.status(404).json({ status: 404, error: 'Question not found' });
    }
  },

  downvoteQuestion: (req, res) => {
    const meetupId = parseInt(req.params.meetupId);
    const questionId = parseInt(req.params.questionId);
    const meetupQuestions = questions[meetupId];
    const question = meetupQuestions.find(q => q.id === questionId);
    if (question) {
      question.downvotes++;
      res.json({ status: 200, data: question });
    } else {
      res.status(404).json({ status: 404, error: 'Question not found' });
    }
  }
};

module.exports = meetupController;
