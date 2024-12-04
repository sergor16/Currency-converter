import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Converter from './components/Converter';
import CurrentRates from './components/CurrentRates';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Converter />} />
        <Route path="/current-rates" element={<CurrentRates />} />
      </Routes>
    </Router>
  );
}

export default App;