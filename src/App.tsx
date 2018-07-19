import * as React from 'react';
import './App.css';

import { Frame, Panel } from './components';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Frame />
        <Panel />
      </div>
    );
  }
}

export default App;
