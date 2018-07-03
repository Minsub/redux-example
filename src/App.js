import React from 'react';
import CounterContainer from './containers/CounterContainer';

class App extends React.Component {
  render() {
    return (
      <div>
        <h2>Counter</h2>
        <CounterContainer />
      </div>
    );
  }
}

export default App;