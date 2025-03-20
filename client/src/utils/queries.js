import { gql } from '@apollo/client';

// Query to fetch a user by username
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
      mentorships {
        _id
        description
        expertise
        industry
        yearsOfExperience
      }
    }
  }
`;

// Query to fetch all thoughts
export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

// Query to fetch a single thought by ID
export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
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

// Query to fetch the logged-in user's data
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
      mentorships {
        _id
        description
        expertise
        industry
        yearsOfExperience
      }
    }
  }
`;

// Query to fetch all mentorships with optional filters
export const QUERY_MENTORSHIPS = gql`
  query getMentorships($industry: String, $yearsOfExperience: Int) {
    mentorships(industry: $industry, yearsOfExperience: $yearsOfExperience) {
      _id
      description
      expertise
      availableTimeSlots
      industry
      yearsOfExperience
      user {
        username
        email
      }
    }
  }
`;
