import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lobby from './components/Lobby';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Main from './components/Main';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <BrowserRouter>
          <Switch>
            <Route exact={true} path='/'>
              <Main/>
            </Route>
            <Route path='/lobby'>
              <Lobby/>
            </Route>
            <Route exact={true} path='/gra'>
              <Game online={false}/>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
