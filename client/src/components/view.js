import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Playground, Terminal, Twilio } from './Playground/index.jsx';
import xTerm from 'xterm';
import io from 'socket.io-client';

class View extends Component {
  constructor(props) {
    super(props);
    var socket = io(); // how to specify port number?

    this.state = {
      terminal: undefined,
      socket: socket,
      editorCode: 'function myScript() {\n\treturn 100;\n}\nconsole.log(myScript());'
    };
    
    xTerm.loadAddon('fit');
    this.handleRunClick = this.handleRunClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
  }

  componentDidMount () {
    var options = {
      cursorBlink: true,
      tabStopWidth: 4
    };
    var term = new xTerm(options);

    this.setState({terminal: term}, _ => {
      term.open(document.getElementById('terminal'));
      term.fit();
      term.blur();

      this.state.socket.on('executed_code', (output) => {
        console.log('Running code, badoop!');
        this.writeTerminal(output);
      });

      this.state.socket.on('cleared_terminal', (output) => {
        console.log('Clearing terminal, Commander!', output);
        this.state.terminal.clear();
      });
      
      this.state.socket.on('connect', () => {
        console.log('Connected to socket. Id:', this.state.socket.id);
      });

          // Error handling
      this.state.socket.on('error', function (error) {
        console.log('Error', error);
      });

      this.state.socket.on('connect_error', (error) => {
        console.log('Connection error:', error);
      });

    });
    
  }

  handleClearClick () {
    this.state.terminal.clear();
  }

    
  writeTerminal (output) {
    var {result, logs, error, longError} = output;

    if (logs.length > 1) {
      this.state.terminal.writeln(logs.join(''));
    } else {
      this.state.terminal.writeln(logs.join('\n'));
    }
    
    if (error) {
      this.state.terminal.writeln(result); // when there's an error, result will become a error message
    }

  }
  
  handleRunClick () {
    // Colorizing feature
    // let colorNode = function (node, color, cb) {
    //   node.style.color = color;
    //   if (cb) {
    //     cb();
    //   }
    // }
    
    let code = document.getElementById('code').value;
    var payload = {
      code: code
    };

    // Socket io emit
    payload = JSON.stringify(payload);

    var headers = new Headers({
      'Content-Type': 'application/json' 
    });
    
    var options = {
      method: 'POST',
      body: payload,
      headers: headers
    };
    
    fetch('run', options)
      .then((res) => {
        res.text()
          .then(output => {
            output = JSON.parse(output);
            console.log('Response from server:', output, typeof output);

            this.state.socket.emit('executed_code', output); 
            this.writeTerminal(output);
            
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
        <Playground handleRunClick={this.handleRunClick} handleClearClick={this.handleClearClick} editorCode={this.state.editorCode} socket={this.state.socket}/>
        <div className="Terminal" id="terminal"></div>        
      </div>
    );
  }
}

export default View;