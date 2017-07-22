import { Link } from 'react-router-dom';
import React from 'react';

module.exports = () => (
  <nav className='navbar navbar-inverse'>
    <div className='container-fluid'>
      <div className="navbar-header">
        <Link to='/'><a className="navbar-brand">CodeSmash</a></Link>
      </div>
      <Link to='/in'><button className="btn btn-danger navbar-btn">Code Now</button></Link>
      <ul className='nav navbar-nav navbar-right'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/dashboard'>Dashboard</Link></li>
        <li><Link to='/pricing'>Pricing</Link></li>
      </ul>
    </div>
  </nav>
);

