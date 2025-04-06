import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import './index.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
// import DashboarPage from './pages/DashboarPage';
import Dashboard from './dashboard/Dashboard'
import NewEducator from './dashboard/pages/NewEducator';
import SuccessPage from './dashboard/pages/SuccessPage';
import AddFirstCoursePage from './dashboard/pages/AddFirstCoursePage';
import EducatorDashboard from './dashboard/pages/EducatorDashboard';
import CourseDetails from './dashboard/pages/CourseDetails';
import EducatorForm from './dashboard/pages/EducatorForm';

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
        <Route path="/add-first-course" element={<AddFirstCoursePage />} />
        <Route path="/educator-dashboard" element={<EducatorDashboard />} />
        <Route path="/course/:courseId" element={<CourseDetails />} />
        <Route path="/abc" element={<EducatorForm />} />
      </Routes>
    </Router>
  );
}

export default App