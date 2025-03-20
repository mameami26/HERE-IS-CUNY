import { gql } from '@apollo/client';

// User authentication mutations
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Thoughts mutations
export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!, $thoughtAuthor: String!) {
    addThought(thoughtText: $thoughtText, thoughtAuthor: $thoughtAuthor) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $thoughtId: ID!
    $commentText: String!
    $commentAuthor: String!
  ) {
    addComment(
      thoughtId: $thoughtId
      commentText: $commentText
      commentAuthor: $commentAuthor
    ) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

// Mentorship mutations
export const CREATE_MENTORSHIP = gql`
  mutation createMentorship($input: MentorshipInput!) {
    createMentorship(input: $input) {
      _id
      description
      expertise
      availableTimeSlots
      industry
      yearsOfExperience
      user {
        username
      }
    }
  }
`;

export const REQUEST_MENTORSHIP = gql`
  mutation requestMentorship($mentorshipId: ID!) {
    requestMentorship(mentorshipId: $mentorshipId) {
      _id
      user {
        username
      }
    }
  }
`;

export const UPDATE_MENTORSHIP = gql`
  mutation updateMentorship(
    $mentorshipId: ID!,
    $expertise: [String],
    $availableTimeSlots: [String],
    $industry: String,
    $yearsOfExperience: Int
  ) {
    updateMentorship(
      mentorshipId: $mentorshipId,
      expertise: $expertise,
      availableTimeSlots: $availableTimeSlots,
      industry: $industry,
      yearsOfExperience: $yearsOfExperience
    ) {
      _id
      description
      expertise
      availableTimeSlots
      industry
      yearsOfExperience
      user {
        username
      }
    }
  }
`;
