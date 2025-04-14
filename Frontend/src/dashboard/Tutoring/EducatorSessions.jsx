import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EducatorSessions = ({ educatorId }) => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/session/educator/${educatorId}`)
      .then(res => setSessions(res.data))
      .catch(err => console.error(err));
  }, [educatorId]);

  const handleEndSession = async (sessionId) => {
    try {
      await axios.patch(`http://localhost:5000/api/session/update-session/${sessionId}/status`, {
        status: 'finished',
      });
      setSessions(sessions.map(s => s._id === sessionId ? { ...s, status: 'finished' } : s));
    } catch (err) {
      console.error('Failed to end session', err);
    }
  };

  const handleJoinSession = (meetingId) => {
    navigate(`/meeting/${meetingId}?userId=${educatorId}&role=educator`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Sessions</h2>
      <ul>
        {sessions.map(session => (
          <li key={session._id} className="mb-3 p-3 border rounded-lg shadow">
            <div><strong>Topic:</strong> {session.topic}</div>
            <div><strong>Scheduled:</strong> {new Date(session.scheduledAt).toLocaleString()}</div>
            <div><strong>Status:</strong> {session.status}</div>
            <div><strong>Participants:</strong> {session.participants.length}</div>

            {(session.status === 'upcoming' || session.status === 'live') && (
              <button
                onClick={() => handleJoinSession(session.meetingId)}
                className="bg-blue-600 text-white px-4 py-2 mt-2 mr-2 rounded"
              >
                Join as Educator
              </button>
            )}

            {session.status === 'live' && (
              <button
                onClick={() => handleEndSession(session._id)}
                className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
              >
                End Session
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducatorSessions;
