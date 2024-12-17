const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  expertise: [String],
  availableTimeSlots: [String],
});

module.exports = mongoose.model('Mentor', mentorSchema);
