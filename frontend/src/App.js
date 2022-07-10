import React from 'react';
import './App.css';


import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import MainPage from './pages/MainPage';



function App() {

  

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<MainPage />} />
          <Route path="/login" index element={<LoginPage />} />
          <Route path="/games" index element={<GamePage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
