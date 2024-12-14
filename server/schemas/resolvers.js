const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Course, Mentor } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        return User.findById(context.user._id);
      }
      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find();
    },
    courses: async () => {
      return Course.find();
    },
    mentors: async () => {
      return Mentor.find().populate('user');
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError('User not found');

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) throw new AuthenticationError('Invalid credentials');

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
      return { token, user };
    },
    signup: async (_, { name, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
      return { token, user };
    },
    addCourse: async (_, { title, description }, context) => {
      if (context.user) {
        return Course.create({ title, description, author: context.user._id });
      }
      throw new AuthenticationError('Not logged in');
    },
    addMentor: async (_, { expertise }, context) => {
      if (context.user) {
        return Mentor.create({ user: context.user._id, expertise });
      }
      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;
