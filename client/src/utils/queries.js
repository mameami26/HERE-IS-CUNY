import { gql } from '@apollo/client';

export const QUERY_COURSES = gql`
  query getCourses {
    courses {
      _id
      title
      description
      category
      level
      enrollments
      author {
        name
        email
      }
    }
  }
`;

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

export const QUERY_JOBS = gql`
 query Jobs {
  jobs {
    _id
    company
    position
    description
    applicationLink
    postedDate
    isWomenFriendly
    supportsDiversity
    applicants
  }
}
`;

export const QUERY_EVENTS = gql`
 query Events {
  events {
    _id
    title
    description
    date
    registrationLink
    tags
    enrollments
  }
}
`;

export const QUERY_USERS = gql`
query Users {
  users {
    _id
    firstName
    lastName
    email
    role
    skills
    bio
    profileImage
  }
}
`;
