// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import xTerm from 'xterm';

// class Terminal extends Component {
//   componentDidMount () {
//     xTerm.loadAddon('fit');
//     var options = {
//       cursorBlink: true
//     };
//     var term = new xTerm(options);
//     term.open(document.getElementById('terminal'));
//     term.write('Hello world!');
//     term.fit();
//     term.blur();
//   }

//   handleWrite () {
//     console.log('Writing something!');
//   }

//   render () {
//     return (
//       <div>
//         Terminal now useless
//       </div>
//     );
//   }
// } 

// export default Terminal;