import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Navigation from './components/navigation/Navigation';
import Statistics from './pages/statistics/Statistics';
import AudioCallMenu from './pages/audio-call/AudioCallMenu';
import SprintMenu from './pages/sprint/SprintMenu';
import SavannahMenu from './pages/savannah/SavannahMenu';
import TextbookMenu from './pages/textbook/TextbookMenu';
import Modal from './pages/modal/Modal';
import Footer from './components/footer/Footer';
import { useTypedSelector } from './hooks/useTypeSelector';

function App() {
  return (
    <div className="container">
      <aside>
        <Navigation />
      </aside>
      <main className="main">
        <Header />
        <div className="main__container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="audio-call" element={<AudioCallMenu />} />
            <Route path="sprint" element={<SprintMenu />} />
            <Route path="savannah" element={<SavannahMenu />} />
            <Route path="textbook" element={<TextbookMenu />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="login" element={<Modal />} />
          </Routes>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default App;
