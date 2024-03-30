const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String
  // Other user fields...
});

const User = mongoose.model('User', userSchema);

module.exports = User;
