import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import AudioCall from './components/games/audio-call/AudioCall';
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
      <div className="root">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="audio-call" element={<AudioCall />} />
          <Route path="sprint" element={<Sprint />} />
          <Route path="textbook" element={<Textbook />} />
          <Route path="statistics" element={<Statistics />} />
        </Routes>
      </div>
	  <Footer />
    </div>
  );
}

export default App;
