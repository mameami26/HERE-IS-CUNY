const typeDefs = `
   type User {
    _id: ID!
    username: String!
    email: String!
    thoughts: [Thought]!
    mentorships: [Mentorship]
  }

  type Thought {
    _id: ID!
    thoughtText: String!
    thoughtAuthor: String!
    createdAt: String!
    comments: [Comment]!
  }

  type Comment {
    _id: ID!
    commentText: String!
    commentAuthor: String!
    createdAt: String!
  }

  type Mentorship {
    _id: ID!
    user: User!
    description: String!
    expertise: [String]!
    availableTimeSlots: [String]!
    industry: String!
    yearsOfExperience: Int!
  }

  type Auth {
    token: ID!
    user: User
  }

  input MentorshipInput {
    description: String!
    expertise: [String]!
    availableTimeSlots: [String]!
    industry: String!
    yearsOfExperience: Int!
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    mentorships(industry: String, yearsOfExperience: Int, limit: Int, offset: Int): [Mentorship]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!, thoughtAuthor: String!): Thought
    addComment(thoughtId: ID!, commentText: String!, commentAuthor: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    createMentorship(input: MentorshipInput!): Mentorship
    updateMentorship(
      mentorshipId: ID!,
      description: String,
      expertise: [String],
      availableTimeSlots: [String],
      industry: String,
      yearsOfExperience: Int
    ): Mentorship
    requestMentorship(mentorshipId: ID!): Mentorship
  }
`;

module.exports = typeDefs;