import { gql } from '@apollo/client';

// Reusable fragments for thoughts
export const THOUGHT_FIELDS = gql`
  fragment ThoughtFields on Thought {
    _id
    thoughtText
    thoughtAuthor
    createdAt
  }
`;

// Query to fetch all users
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        ...ThoughtFields
      }
    }
  }
  ${THOUGHT_FIELDS}
`;

// Query to fetch all thoughts
export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      ...ThoughtFields
    }
  }
  ${THOUGHT_FIELDS}
`;

// Query to fetch a single thought by ID
export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      ...ThoughtFields
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
  ${THOUGHT_FIELDS}
`;

// Query to fetch the logged-in user's data
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      thoughts {
        ...ThoughtFields
      }
      mentorships {
        _id
        expertise
        industry
        yearsOfExperience
      }
    }
  }
  ${THOUGHT_FIELDS}
`;

// Query to fetch mentorships
export const QUERY_MENTORSHIPS = gql`
  query getMentorships($industry: String, $yearsOfExperience: Int) {
    mentorships(industry: $industry, yearsOfExperience: $yearsOfExperience) {
      _id
      industry
      yearsOfExperience
      availableTimeSlots
      user {
        firstName
        lastName
      }
    }
  }
`;
