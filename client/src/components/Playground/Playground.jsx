import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from 'codemirror';
// import requestt from 'request';

class Playground extends Component {
  constructor (props) {
    super(props);

    this.handleRunClick = props.handleRunClick;
    this.handleClearClick = props.handleClearClick;
  }

  componentDidMount () {
    console.log('Playground mounted...');  
    console.log('Code mirror loading...');
    var textArea = document.getElementById('code');
    var defaultString = this.props.editorCode;
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
    codeMirror.on('keyup', (cm, change) => {
      console.log('Change', change);
      this.props.socket.emit('changed_code', codeMirror.getValue());
      cm.save(); // saves editor's value to textarea value
    });
    console.log('Mirror:', document.getElementsByClassName('CodeMirror'));
    document.getElementsByClassName('CodeMirror')[0].addEventListener('keypress', _ => {
      console.log('pressed a key on codemirror!');
      
    });
    this.props.socket.on('changed_code', (code) => {
      codeMirror.setValue(code);
      // codeMirror.on('change', (cm, change) => {
      //   this.props.socket.emit('changed_code', code);
      //   cm.save(); // saves editor's value to textarea value
      // });
    });
  }

  render () {
   
    return (
      <div className="playground">
        <div className="buttons">
          <button onClick={ _ => {
            this.handleRunClick();
            }} 
            className="run"
          >
          Run
          </button>  
          <button onClick={this.handleClearClick} className="run">Clear</button>  
        </div>
        <textarea id="code"></textarea>
      </div>
    );
  }
}

export default Playground;