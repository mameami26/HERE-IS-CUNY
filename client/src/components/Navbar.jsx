// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#0074d9', color: '#fff' }}>
      <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
        <li style={{ margin: '0 1rem' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
        </li>
        <li style={{ margin: '0 1rem' }}>
          <Link to="/mentorship" style={{ color: '#fff', textDecoration: 'none' }}>Mentorship</Link>
        </li>
        <li style={{ margin: '0 1rem' }}>
          <Link to="/courses" style={{ color: '#fff', textDecoration: 'none' }}>Courses</Link>
        </li>
        <li style={{ margin: '0 1rem' }}>
          <Link to="/messages" style={{ color: '#fff', textDecoration: 'none' }}>Messages</Link>
        </li>
        <li style={{ margin: '0 1rem' }}>
          <Link to="/profile" style={{ color: '#fff', textDecoration: 'none' }}>Profile</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
