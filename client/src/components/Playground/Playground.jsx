import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from 'codemirror';
// import requestt from 'request';

class Playground extends Component {
  constructor (props) {
    super(props);

    this.handleRunClick = props.handleRunClick.bind(this);
    this.handleClearClick = props.handleClearClick.bind(this);
  }

  componentDidMount () {

    console.log('Playground mounted..f.');  
    console.log('Code mirror loading...');
    var textArea = document.getElementById('code');
    var defaultString = 'function myScript() {\n\treturn 100;\n}\nconsole.log(myScript());';
    var options = {
      // indentUnit: 2,
      lineNumbers: true,
      mode: 'javascript',
      theme: 'night',
      autofocus: true,
      // viewportMargin: Infinity
    };
    textArea.value = defaultString;
    var codeMirror = CodeMirror.fromTextArea(textArea, options);
    codeMirror.setSize('100%', '100%');
    codeMirror.on('change', function(cm, change) {
      cm.save(); // saves editor's value to textarea value
    });
  }

  render () {
   
    return (
      <div className="playground">
        <div className="buttons">
          <button onClick={this.handleRunClick} className="run">Run</button>  
          <button onClick={this.handleClearClick} className="run">Clear</button>  
        </div>
        <textarea id="code"></textarea>
      </div>
    );
  }
}

export default Playground;