import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/ChatPage';
import Routers from './routes';

function App() {
  return (
    <div className="App">
      <Routers />
    </div>
  );
}

export default App;
