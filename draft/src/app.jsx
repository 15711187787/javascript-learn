import React, { Component } from 'react';

import Editor from './components/editor/wysiwyg-editor';
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Editor />
      </div>
    );
  }
}

export default App;
