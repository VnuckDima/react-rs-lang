import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AudioCall from './components/games/audio-call/AudioCall';
import Sprint from './components/games/sprint/Sprint';
import Header from './components/header/Header';
import Home from './components/home/Home';

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="audio-call" element={<AudioCall />} />
	  <Route path="sprint" element={<Sprint />} />
      </Routes>
    </div>
  );
}

export default App;
