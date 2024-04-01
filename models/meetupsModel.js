const mongoose = require("mongoose");

const meetupSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String},
  images: {
    type: [String],
  },
});

const Meetups = mongoose.model("Meetups", meetupSchema);

module.exports = Meetups;
