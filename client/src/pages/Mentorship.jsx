import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MENTORSHIPS } from '../utils/queries';
import MentorshipCard from '../components/Mentorships/MentorshipCard';
import '../style/Mentorships.css'; // Import CSS for styling

const MentorshipPage = () => {
  const { loading, error, data } = useQuery(QUERY_MENTORSHIPS, {
    variables: { industry: "Web Development", yearsOfExperience: 5 }, // Example variables
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading mentorships: {error.message}</p>;

  const mentorships = data?.mentorships || [];

  return (
    <div className="mentorship-page">
      <h1>Mentorship Opportunities</h1>
      <p>Explore mentorships available in your field.</p>
      <div className="mentorship-list">
        {mentorships.map((mentorship) => (
          <MentorshipCard key={mentorship._id} mentorship={mentorship} />
        ))}
      </div>
    </div>
  );
};

export default MentorshipPage;
