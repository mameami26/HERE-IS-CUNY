const { Schema, model } = require('mongoose');

const mentorshipSchema = new Schema(
  {
    description: {
      type: String,
      required: true, // Ensures that every mentorship has a description
    },
    image: {
      type: String,
      default: '', // Default to an empty string if no image is provided
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true, // Ensures that every mentorship is linked to a user
    },
    expertise: {
      type: [String],
      trim: true,
      required: true, // Ensures that expertise is provided
    },
    availableTimeSlots: {
      type: [String],
      validate: {
        validator: (slots) => Array.isArray(slots) && slots.length > 0,
        message: 'At least one available time slot is required.',
      },
    },
    industry: {
      type: String,
      trim: true,
      required: true,
      enum: ['Development', 'Design', 'Marketing', 'Finance', 'Other'], // Example industries
    },
    yearsOfExperience: {
      type: Number,
      min: 0,
      required: true, // Ensures that years of experience is provided
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
  }
);

const Mentorship = model('Mentorship', mentorshipSchema);

module.exports = Mentorship;
