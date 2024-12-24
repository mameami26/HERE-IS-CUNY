import React from 'react';
import '../../style/Mentorships.css'; // Ensure correct relative path

const MentorshipCard = ({ mentorship }) => {
  // Handle request mentorship button
  const requestMentorship = () => {
    alert(`Request sent to ${mentorship.user.firstName} ${mentorship.user.lastName}`);
    // Here you can add logic to send a request to the backend.
  };

  // Ensure data validation to avoid crashes
  if (!mentorship || !mentorship.user) {
    return <div>Error: Mentorship data is incomplete or unavailable.</div>;
  }

  return (
    <div className="mentorship-card">
      <h3>{mentorship.user.firstName} {mentorship.user.lastName}</h3>
      <p><strong>Industry:</strong> {mentorship.industry || 'Not specified'}</p>
      <p><strong>Expertise:</strong> {mentorship.expertise?.join(', ') || 'No expertise listed'}</p>
      <p><strong>Years of Experience:</strong> {mentorship.yearsOfExperience || 'Not provided'}</p>
      <p><strong>Available Time Slots:</strong> {mentorship.availableTimeSlots?.join(', ') || 'No time slots available'}</p>
      <button className="btn-primary" onClick={requestMentorship}>
        Request Mentorship
      </button>
    </div>
  );
};

export default MentorshipCard;
