import { gql } from '@apollo/client';

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
    }
  }
`;

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
