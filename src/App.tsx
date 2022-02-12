import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Navigation from './components/navigation/Navigation';
import Textbook from './pages/textbook/Textbook';
import Statistics from './pages/statistics/Statistics';
import AudioCallMenu from './pages/audio-call/AudioCallMenu';
import Sprint from './pages/sprint/Sprint';
import SavannahMenu from './pages/savannah/SavannahMenu';

function App() {
  return (
    <div className="container">
      <Header />
        <Navigation />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="audio-call" element={<AudioCallMenu />} />
            <Route path="sprint" element={<Sprint />} />
            <Route path="savannah" element={<SavannahMenu />} />
            <Route path="textbook" element={<Textbook />} />
            <Route path="statistics" element={<Statistics />} />
          </Routes>
        </main>
    </div>
  );
}

export default App;
