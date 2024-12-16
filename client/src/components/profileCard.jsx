import React from 'react';

function ProfileCard({ name, bio, skills }) {
  return (
    <div className="profile-card">
      <h3>{name}</h3>
      <p>{bio}</p>
      <ul>
        {skills.map(skill => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileCard;
