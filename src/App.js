import './App.css';
import React from 'react';
import Game from './components/Game';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Game/>
      </div>
    </div>
  );
}

export default App;
