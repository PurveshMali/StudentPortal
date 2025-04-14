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
import MeetingRoom from './dashboard/Tutoring/MeetingRoom';
import AvailableSessions from './dashboard/Tutoring/AvailableSessions';
import EducatorSessions from './dashboard/Tutoring/EducatorSessions';

function App() {
  const meetingId = "59caad55-6e2d-4224-b17f-73da38e2d1e0";
  const userId = "user125";  // In practice, this comes from your auth/user details

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
        {/* <Route path="/abc" element={<EducatorForm />} /> */}
        <Route path="/meeting/:meetingId" element={<MeetingRoom />} />
        <Route path="/available-sessions" element={<AvailableSessions studentId={userId} />} />
        <Route path="/educator-sessions" element={<EducatorSessions educatorId="educator123" />} />
      </Routes>
    </Router>
  );
}

export default App