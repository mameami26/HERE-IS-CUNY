const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  level: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Course', courseSchema);
