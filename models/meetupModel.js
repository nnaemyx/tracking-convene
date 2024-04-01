const mongoose = require("mongoose");

const meetupSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  images: {
    type: [String],
  },
});

const Meetup = mongoose.model("Meetup", meetupSchema);

module.exports = Meetup;
