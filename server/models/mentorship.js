const mongoose = require("mongoose");

const mentorshipSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  expertise: [String],
  availableTimeSlots: [String],
  industry: String,
  yearsOfExperience: Number,
});

module.exports = mongoose.model("Mentorship", mentorshipSchema);
