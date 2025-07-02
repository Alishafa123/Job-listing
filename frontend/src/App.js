import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddJob from './pages/AddJob';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>🌟 Job Portal</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/add">Add Job</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddJob />} />
        <Route path="/edit/:id" element={<AddJob />} />
      </Routes>
    </div>
  );
}

export default App;