const mongoose = require("mongoose");

const meetupSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: {
    type: [String],
  },
});

const Meetups = mongoose.model("Meetups", meetupSchema);

module.exports = Meetups;
