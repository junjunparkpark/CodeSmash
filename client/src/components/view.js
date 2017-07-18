import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Playground } from './Playground/index.jsx';
import { Terminal } from './Playground/index.jsx';
import { Twilio } from './Playground/index.jsx';
import xTerm from 'xterm';


class View extends Component {

  constructor(props) {
    super(props);

    this.state = {
      terminal: undefined
    };
    xTerm.loadAddon('fit');
    this.handleRunClick = this.handleRunClick.bind(this);
  }

  componentDidMount () {
    var options = {
      cursorBlink: true
    };
    var term = new xTerm(options);

    this.setState({terminal: term}, _ => {
      term.open(document.getElementById('terminal'));
      term.fit();
      term.blur();
      console.log('Term:', xTerm);
    });

  }

  handleRunClick () {
    console.log('Whoo, click detected by view!');
    var code = document.getElementById('code').value;
    var payload = {
      code: code
    };
    payload = JSON.stringify(payload);

    var headers = new Headers({
      "Content-Type": 'application/json'
    });
    
    var options = {
      method: 'POST',
      body: payload,
      headers: headers
    };
    
    fetch('run', options)
      .then((res) => {
        console.log('Sending:', payload);
        res.text()
        .then(output => {
          console.log('Recieved response...');
          output = JSON.parse(output);
          console.log('Response from server:', output, typeof output);
          var {result, logs, error, longError} = output;

          this.state.terminal.writeln(logs.join(''));
          this.state.terminal.writeln(result);
          if (error) {
            this.state.terminal.writeln(longError);
          }
          // this.state.terminal.write('<span class="red">Hi</span>');
          // this.state.terminal.writeln(error);
        });
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  render () {
    console.log('Playground:', Playground);
    return (
      <div className="view">
        <Playground handleRunClick={this.handleRunClick} />
         <div className="Terminal" id="terminal"></div>        
      </div>
    );
  }
}

export default View;