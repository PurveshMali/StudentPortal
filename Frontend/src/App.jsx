import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import './index.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
// import DashboarPage from './pages/DashboarPage';
import Dashboard from './dashboard/Dashboard'
import NewEducator from './dashboard/pages/NewEducator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route path="/dashboard" element={<DashboarPage />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-educator" element={<NewEducator />} />
      </Routes>
    </Router>
  );
}

export default App