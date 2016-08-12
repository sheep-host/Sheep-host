import React, { Component } from 'react';
import { render } from 'react-dom';

import stylesheet from '../public/style.css';

class App extends Component {
  constructor(props) {
      super(props)
      this.state = {};
  }

  render() {
    return (
      <div>
        <h1>React Starter</h1>
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
