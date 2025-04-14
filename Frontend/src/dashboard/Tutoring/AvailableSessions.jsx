import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AvailableSessions = ({ studentId }) => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/session/available-sessions").then((res) => {
      setSessions(res.data);
      console.log(res.data);
    });
  }, []);

  const handleJoin = async (session) => {
    console.log(session.meetingId, studentId);
    try {
      const res = await axios.post("http://localhost:5000/api/session/join", {
        meetingId: session.meetingId,
        studentId,
      });

      if (res.data.success) {
        console.log('Student joined successfully:', studentId);
        navigate(`/meeting/${session.meetingId}?userId=${studentId}`);
      } else {
        alert(res.data.message || "Unable to join");
      }
    } catch (err) {
      alert("Error joining session");
    }
  };

  return (
    <div>
      <h2>Available Sessions</h2>
      {sessions.map((session) => (
        <div key={session._id} style={{ marginBottom: "1rem" }}>
          <p><strong>Topic:</strong> {session.topic}</p>
          <p><strong>Starts at:</strong> {new Date(session.scheduledAt).toLocaleTimeString()}</p>
          <button onClick={() => handleJoin(session)}>Join</button>
        </div>
      ))}
    </div>
  );
};

export default AvailableSessions;
