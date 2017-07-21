import { Link } from 'react-router-dom';
import React from 'react';

module.exports = () => (
  <nav>
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/in'>Playground</Link></li>
      <li><Link to='/dashboard'>Dashboard</Link></li>
      <li><Link to='/pricing'>Pricing</Link></li>
    </ul>
  </nav>
)