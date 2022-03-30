import React from 'react';
import './App.scss';
import Game from './pages/game/Game';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';

function App() {
  return (
    <HashRouter basename='/'>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/game' element={<Game />} />
          </Routes>
        </header>
      </div>
    </HashRouter>
  );
}

export default App;
