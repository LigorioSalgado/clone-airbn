import React, { Component } from 'react';
import './App.css';
import Inicio from './components/Landing Page/Inicio';
import Nvar from './components/Nvar/Nvar';

class App extends Component {
  render() {
    return (
      <div className="App Seccion">
        <Nvar />
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
