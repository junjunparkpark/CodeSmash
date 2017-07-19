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
      terminal: undefined,
      line: 1,
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
    });

  }

  handleClearClick () {
    this.state.terminal.clear();
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
        res.text()
        .then(output => {
          output = JSON.parse(output);
          console.log('Response from server:', output, typeof output);
          var {result, logs, error, longError} = output;

          if (logs.length > 1) {
            this.state.terminal.writeln(logs.join(''));
          } else {
            this.state.terminal.writeln(logs.join('\n'));
          }
          
          if (error) {
            console.log('Error!');

            this.state.terminal.writeln(result);
          }

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
        <Playground handleRunClick={this.handleRunClick} handleClearClick={this.handleClearClick}/>
         <div className="Terminal" id="terminal"></div>        
      </div>
    );
  }
}

export default View;