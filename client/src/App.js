import React, { Component } from 'react';
import './App.css';
import Inicio from './components/Landing Page/Inicio';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="p-5">
            <Inicio />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
