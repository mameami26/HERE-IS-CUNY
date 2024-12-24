import { gql } from '@apollo/client';

// Query to fetch all users
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

// Query to fetch mentorship opportunities
export const QUERY_MENTORSHIPS = gql`
  query mentorships($industry: String, $yearsOfExperience: Int) {
    mentorships(industry: $industry, yearsOfExperience: $yearsOfExperience) {
      _id
      user {
        _id
        firstName
        lastName
      }
      expertise
      availableTimeSlots
      industry
      yearsOfExperience
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
        expertise
        industry
        yearsOfExperience
      }
    }
  }
`;

// Query to fetch mentorships created by the logged-in user
export const QUERY_MY_MENTORSHIPS = gql`
  query myMentorships {
    myMentorships {
      _id
      expertise
      availableTimeSlots
      industry
      yearsOfExperience
    }
  }
`;

// Query to fetch mentorship details by ID
export const QUERY_SINGLE_MENTORSHIP = gql`
  query getSingleMentorship($mentorshipId: ID!) {
    mentorship(mentorshipId: $mentorshipId) {
      _id
      user {
        _id
        firstName
        lastName
        email
      }
      expertise
      availableTimeSlots
      industry
      yearsOfExperience
    }
  }
`;
