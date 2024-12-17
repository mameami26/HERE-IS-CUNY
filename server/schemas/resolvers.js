const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AuthenticationError, ApolloError } = require('apollo-server-express');
const { User, Course, Mentor, Mentorship, Job, Event } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new AuthenticationError('Not logged in');
    },
    users: async () => await User.find(),
    courses: async () => await Course.find(),
    mentors: async () => await Mentor.find().populate('user'),
    mentorships: async (_, { industry, yearsOfExperience }) => {
      const filters = {};
      if (industry) filters.industry = industry;
      if (yearsOfExperience) filters.yearsOfExperience = yearsOfExperience;
      return await Mentorship.find(filters).populate('user');
    },
    jobs: async () => await Job.find(),
    events: async () => await Event.find(),
  },

  Mutation: {
    signup: async (_, { name, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });

      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError('User not found');

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) throw new AuthenticationError('Invalid credentials');

      const token = signToken(user);
      return { token, user };
    },
    addCourse: async (_, { title, description }, context) => {
      if (!context.user) throw new AuthenticationError('Not logged in');
      return await Course.create({ title, description, author: context.user._id });
    },
    addMentor: async (_, { expertise }, context) => {
      if (!context.user) throw new AuthenticationError('Not logged in');
      return await Mentor.create({ user: context.user._id, expertise });
    },
    createMentorship: async (_, { expertise, availableTimeSlots, industry, yearsOfExperience }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      try {
        const newMentorship = await Mentorship.create({
          user: user._id,
          expertise,
          availableTimeSlots,
          industry,
          yearsOfExperience,
        });
        return await Mentorship.findById(newMentorship._id).populate('user');
      } catch (error) {
        throw new ApolloError('Error creating mentorship', 'INTERNAL_SERVER_ERROR');
      }
    },
    createJob: async (_, { company, position, description, applicationLink, postedDate, isWomenFriendly }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      const job = new Job({ company, position, description, applicationLink, postedDate, isWomenFriendly });
      await job.save();
      return job;
    },
    createEvent: async (_, { title, description, date, registrationLink, tags }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      const event = new Event({ title, description, date, registrationLink, tags });
      await event.save();
      return event;
    },
    enrollEvent: async (_, { eventId }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      const event = await Event.findById(eventId);
      if (!event) throw new ApolloError('Event not found', 'NOT_FOUND');

      event.enrollments++;
      await event.save();
      return event;
    },
    applyJob: async (_, { jobId }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      const job = await Job.findById(jobId);
      if (!job) throw new ApolloError('Job not found', 'NOT_FOUND');

      job.applicants.push(user._id);
      await job.save();
      return job;
    },
    updateUser: async (_, args, context) => {
      if (!context.user) throw new AuthenticationError('Not logged in');
      return await User.findByIdAndUpdate(context.user._id, args, { new: true });
    },
  },
};

module.exports = resolvers;
