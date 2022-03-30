import React from 'react';
import './App.scss';
import Game from './pages/game/Game';
import Home from './pages/home/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path='/' element={ <Home />}/>
          <Route path='/game' element={ <Game /> }/>
        </Routes>
      </header>
    </div>
    </Router>
  );
}

export default App;
