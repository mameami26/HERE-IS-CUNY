const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['mentor', 'mentee'] },
  skills: [String],
  bio: String,
  profileImage: String,
});

module.exports = mongoose.model('User', userSchema);
