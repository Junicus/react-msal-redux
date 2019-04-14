import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <button onClick={this.props.login}>Login</button>
          <button onClick={this.props.logout}>Logout</button>
        </div>
        <div>
          <h3>User</h3>
          <pre>{JSON.stringify(this.props.user, 2)}</pre>
        </div>
        <div>
          <h3>Access Token</h3>
          <pre>{this.props.accessToken}</pre>
        </div>
      </div>
    );
  }
}

export default App;
