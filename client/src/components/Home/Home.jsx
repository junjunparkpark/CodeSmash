import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Routes/NavBar.jsx';

class Home extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar/>
        <h1> Hello World</h1>
      </div>
    );
  }
}

export default Home;