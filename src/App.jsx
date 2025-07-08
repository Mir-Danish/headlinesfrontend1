import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home';
import About from './components/About';
import Events from './components/Events';
import DetailsPage from './components/DetailsPage';
import AdminPanel from './components/AdminPanel';
import usePageTracking from './usePageTracking';

function App() {
  return (
    <Router>
      <PageTracker />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/post/:postId" element={<DetailsPage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  )
}

function PageTracker() {
  usePageTracking();
  return null;
}

export default App
