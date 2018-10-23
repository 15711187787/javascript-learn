import React, { Component } from 'react';

import Editor from './components/editor';
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>begin</p>
          <Editor />
          <p>end</p>
        </header>
      </div>
    );
  }
}

export default App;
