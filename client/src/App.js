import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Test from './components/Test';
import Profile from './components/Profile/Profile';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Profile/>
      </div>
    );
  }
}

export default App;
