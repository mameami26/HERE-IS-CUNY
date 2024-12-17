const typeDefs = `
  # User Roles Enum
  enum UserRole {
    STUDENT
    ADMIN
    INSTRUCTOR
  }

  # User Type
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: UserRole!
    skills: [String]
    bio: String
    profileImage: String
  }

  # Mentorship Type
  type Mentorship {
    _id: ID!
    user: User!
    expertise: [String]!
    availableTimeSlots: [String]!
    industry: String
    yearsOfExperience: Int
  }

  # Job Type
  type Job {
    _id: ID!
    company: String!
    position: String!
    description: String!
    applicationLink: String!
    postedDate: String!
    isWomenFriendly: Boolean!
    supportsDiversity: Boolean
    applicants: [User]
  }

  # Event Type
  type Event {
    _id: ID!
    title: String!
    description: String!
    date: String!
    registrationLink: String!
    tags: [String]
    enrollments: Int
  }

  # Course Type
  type Course {
    _id: ID!
    title: String!
    description: String!
    author: User!
  }

  # Auth Type for Authentication Responses
  type Auth {
    token: ID!
    user: User
  }

  # Query Definitions
  type Query {
    me: User
    users: [User]
    courses: [Course]
    mentors: [Mentorship]
    mentorships(industry: String, yearsOfExperience: Int): [Mentorship]
    jobs: [Job]
    events: [Event]
  }

  # Input for User Creation
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    role: UserRole!
  }

  # Mutation Definitions
  type Mutation {
    signup(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addCourse(title: String!, description: String!): Course
    addMentor(expertise: String!): Mentorship
    createMentorship(
      expertise: [String]!
      availableTimeSlots: [String]!
      industry: String
      yearsOfExperience: Int
    ): Mentorship
    createJob(
      company: String!
      position: String!
      description: String!
      applicationLink: String!
      postedDate: String!
      isWomenFriendly: Boolean!
    ): Job
    createEvent(
      title: String!
      description: String!
      date: String!
      registrationLink: String!
      tags: [String]
    ): Event
    enrollEvent(eventId: ID!): Event
    applyJob(jobId: ID!): Job
    updateUser(
      firstName: String
      lastName: String
      email: String
      role: UserRole
      skills: [String]
      bio: String
      profileImage: String
    ): User
  }
`;

module.exports = typeDefs;
