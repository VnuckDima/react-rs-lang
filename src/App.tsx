import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AudioCallCategory from './components/games/audio-call/AudioCallCategory';
import Sprint from './components/games/sprint/Sprint';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Navigation from './components/navigation/Navigation';
import Statistics from './components/statistics/Statistics';
import Textbook from './components/textbook/Textbook';

function App() {
  return (
    <div className="container">
      <Header />
        <Navigation />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="audio-call" element={<AudioCallCategory />} />
            <Route path="sprint" element={<Sprint />} />
            <Route path="textbook" element={<Textbook />} />
            <Route path="statistics" element={<Statistics />} />
          </Routes>
        </main>
    </div>
  );
}

export default App;
