const { User, Thought, Mentorship } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { ApolloError } = require('apollo-server-express');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('thoughts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts');
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId });
    },
    mentorships: async (_, { industry, yearsOfExperience }) => {
      try {
        const filters = {};
        if (industry) filters.industry = industry;
        if (yearsOfExperience) filters.yearsOfExperience = yearsOfExperience;
        return await Mentorship.find(filters).populate('user');
      } catch (err) {
        console.error('Error fetching mentorships:', err);
        throw new Error('Failed to fetch mentorships');
      }
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addThought: async (parent, { thoughtText, thoughtAuthor }) => {
      try {
        const thought = await Thought.create({ thoughtText, thoughtAuthor });
        await User.findOneAndUpdate(
          { username: thoughtAuthor },
          { $addToSet: { thoughts: thought._id } }
        );
        return thought;
      } catch (err) {
        console.error('Error adding thought:', err);
        throw new Error('Failed to add thought');
      }
    },
    addComment: async (parent, { thoughtId, commentText, commentAuthor }) => {
      try {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $addToSet: { comments: { commentText, commentAuthor } },
          },
          { new: true, runValidators: true }
        );
      } catch (err) {
        console.error('Error adding comment:', err);
        throw new Error('Failed to add comment');
      }
    },
    removeThought: async (parent, { thoughtId }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');

      const thought = await Thought.findById(thoughtId);
      if (thought.thoughtAuthor !== user.username) {
        throw new AuthenticationError('You are not authorized to delete this thought');
      }

      return Thought.findOneAndDelete({ _id: thoughtId });
    },
    createMentorship: async (_, { description, expertise, availableTimeSlots, industry, yearsOfExperience }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');

      try {
        const newMentorship = await Mentorship.create({
          user: user._id,
          description, // Ensure description is included
          expertise,
          availableTimeSlots,
          industry,
          yearsOfExperience,
        });

        return await Mentorship.findById(newMentorship._id).populate('user');
      } catch (error) {
        console.error('Error creating mentorship:', error);
        throw new ApolloError('Error creating mentorship', 'INTERNAL_SERVER_ERROR');
      }
    },

    updateMentorship: async (_, { mentorshipId, description, expertise, availableTimeSlots, industry, yearsOfExperience }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');

      try {
        const mentorship = await Mentorship.findById(mentorshipId);
        if (!mentorship) throw new ApolloError('Mentorship not found', 'NOT_FOUND');

        if (mentorship.user.toString() !== user._id.toString()) {
          throw new AuthenticationError('You are not authorized to update this mentorship');
        }

        // Ensure at least one field is updated
        if (description !== undefined) mentorship.description = description;
        if (expertise !== undefined) mentorship.expertise = expertise;
        if (availableTimeSlots !== undefined) mentorship.availableTimeSlots = availableTimeSlots;
        if (industry !== undefined) mentorship.industry = industry;
        if (yearsOfExperience !== undefined) mentorship.yearsOfExperience = yearsOfExperience;

        await mentorship.save();
        return mentorship;
      } catch (err) {
        console.error('Error updating mentorship:', err);
        throw new ApolloError('Error updating mentorship', 'INTERNAL_SERVER_ERROR');
      }
    },
  },
};

module.exports = resolvers;
