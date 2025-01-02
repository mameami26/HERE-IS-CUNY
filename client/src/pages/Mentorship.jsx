import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_MENTORSHIPS } from '../utils/queries';
import { REQUEST_MENTORSHIP } from '../utils/mutations';
import '../style/mentorships.css';

function MentorshipPage() {
  const [filter, setFilter] = useState({ industry: '', yearsOfExperience: '' });
  const { loading, error, data } = useQuery(QUERY_MENTORSHIPS, {
    variables: {
      industry: filter.industry,
      yearsOfExperience: parseInt(filter.yearsOfExperience) || undefined,
    },
  });
  const [requestMentorship] = useMutation(REQUEST_MENTORSHIP);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleRequest = async (mentorshipId) => {
    try {
      const { data } = await requestMentorship({ variables: { mentorshipId } });
      alert(`Request sent to ${data.requestMentorship.user.firstName}`);
    } catch (err) {
      alert('Error sending request: ' + err.message);
    }
  };

  if (loading) return <p>Loading mentorships...</p>;
  if (error) return <p>Error fetching mentorships: {error.message}</p>;

  const mentorships = data?.mentorships || [];

  return (
    <div className="mentorship-page">
      <header className="mentorship-header">
        <h1>Available Mentorships</h1>
        <p>Explore mentorship opportunities and connect with experts!</p>
      </header>

      {/* Filter Form */}
      <form className="filter-form">
        <input
          type="text"
          name="industry"
          placeholder="Filter by Industry"
          value={filter.industry}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="yearsOfExperience"
          placeholder="Years of Experience"
          value={filter.yearsOfExperience}
          onChange={handleInputChange}
        />
        <button type="button" onClick={() => setFilter({ ...filter })}>
          Apply Filters
        </button>
      </form>

      {/* Mentorship List */}
      <section className="mentorship-list">
        {mentorships.length > 0 ? (
          mentorships.map((mentorship) => (
            <div key={mentorship._id} className="mentorship-card">
              <h2>
                {mentorship.user.firstName} {mentorship.user.lastName}
              </h2>
              <p><strong>Industry:</strong> {mentorship.industry || 'N/A'}</p>
              <p><strong>Expertise:</strong> {mentorship.expertise?.join(', ') || 'N/A'}</p>
              <p><strong>Years of Experience:</strong> {mentorship.yearsOfExperience || 'N/A'}</p>
              <p><strong>Available Time Slots:</strong> {mentorship.availableTimeSlots?.join(', ') || 'N/A'}</p>
              <button onClick={() => handleRequest(mentorship._id)}>Request Mentorship</button>
            </div>
          ))
        ) : (
          <p>No mentorships found with the applied filters.</p>
        )}
      </section>
    </div>
  );
}

export default MentorshipPage;
