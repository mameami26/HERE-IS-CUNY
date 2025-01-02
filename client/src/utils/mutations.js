import { gql } from '@apollo/client';

// User authentication
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

// Thoughts and comments
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
  mutation addComment($thoughtId: ID!, $commentText: String!, $commentAuthor: String!) {
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

// Mentorships
export const CREATE_MENTORSHIP = gql`
  mutation createMentorship($expertise: [String]!, $availableTimeSlots: [String]!, $industry: String, $yearsOfExperience: Int) {
    createMentorship(expertise: $expertise, availableTimeSlots: $availableTimeSlots, industry: $industry, yearsOfExperience: $yearsOfExperience) {
      _id
      expertise
      availableTimeSlots
      industry
      yearsOfExperience
    }
  }
`;

export const REQUEST_MENTORSHIP = gql`
  mutation requestMentorship($mentorshipId: ID!) {
    requestMentorship(mentorshipId: $mentorshipId) {
      _id
      user {
        firstName
        lastName
      }
    }
  }
`;


export const UPDATE_MENTORSHIP = gql`
  mutation updateMentorship($mentorshipId: ID!, $expertise: [String], $availableTimeSlots: [String], $industry: String, $yearsOfExperience: Int) {
    updateMentorship(mentorshipId: $mentorshipId, expertise: $expertise, availableTimeSlots: $availableTimeSlots, industry: $industry, yearsOfExperience: $yearsOfExperience) {
      _id
      expertise
      availableTimeSlots
      industry
      yearsOfExperience
    }
  }
`;
