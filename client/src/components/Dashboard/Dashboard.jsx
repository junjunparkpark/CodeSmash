import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Routes/Navbar.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <Navbar/>
        <h1>
          Dashboard!
        </h1>
      </div>
    );
  }
}

export default Dashboard;