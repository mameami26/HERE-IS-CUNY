const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    role: String
    skills: [String]
    bio: String
    profileImage: String
  }

  type Course {
    _id: ID
    title: String
    description: String
    category: String
    level: String
    content: String
    author: User
  }

  type Mentor {
    _id: ID
    user: User
    expertise: [String]
    availableTimeSlots: [String]
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me: User
    users: [User]
    courses: [Course]
    mentors: [Mentor]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    signup(name: String!, email: String!, password: String!): Auth
    addCourse(title: String!, description: String!): Course
    addMentor(expertise: [String]!): Mentor
  }
`;

module.exports = typeDefs;
