import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Routes/Navbar.jsx';

class Pricing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar/>
        <h1>
          Pricing!
        </h1>
      </div>
    );
  }
}

export default Pricing;