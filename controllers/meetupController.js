const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Meetups = require('../models/meetupsModel');
const Question = require('../models/questionModel');
const { default: slugify } = require("slugify");

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: 'dzzsgxtdw', 
  api_key: '683928135667357', 
  api_secret: 'qzNetn5zqB3GH_LOy2LxU_nffhY' 
});

// Configure multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "meetups",
    allowed_formats: ["jpg", "png"],
  },
});
const upload = multer({ storage: storage });
const meetupController = {
  createMeetup: async (req, res) => {
    try {
      // Upload images to Cloudinary
      await upload.array("images")(req, res, async (err) => {
        if (err) {
          throw new Error("Error uploading images");
        }

        const imageURLs = req.files.map((file) => file.path);

        if (req.body.title) {
          req.body.slug = slugify(req.body.title);
        }

        const meetup = await Meetups.create({
          ...req.body,
          images: imageURLs,
        });
        res.status(201).json({ status: 201, data: meetup });
      });
    } catch (error) {
      console.error('Error creating meetup:', error);
      res.status(500).json({ status: 500, error: 'Internal server error' });
    }
  },

  getMeetups: async (req, res) => {
    try {
      const meetups = await Meetup.find();
      res.status(200).json({ status: 200, data: meetups });
    } catch (error) {
      console.error('Error getting meetups:', error);
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
