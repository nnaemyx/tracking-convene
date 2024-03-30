const mongoose = require("mongoose");

const meetupSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: {
    type: [String],
  },
});

const Meetup = mongoose.model("Meetup", meetupSchema);

module.exports = Meetup;
