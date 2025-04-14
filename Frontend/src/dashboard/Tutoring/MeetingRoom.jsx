import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";
const PEER_SERVER_HOST = "localhost";
const PEER_SERVER_PORT = 9000;

const MeetingRoom = (props) => {
  const query = new URLSearchParams(window.location.search);

  const meetingId =
    props.meetingId || query.get("meetingId") || "default-meeting";
  const userId =
    props.userId ||
    query.get("userId") ||
    `user-${Math.floor(Math.random() * 10000)}`;

  const roleFromURL = query.get("role") || "student";
  const nameFromURL = query.get("name") || "Guest";

  const [role, setRole] = useState(roleFromURL);
  const [name, setName] = useState(nameFromURL);

  const [studentsList, setStudentsList] = useState([]);
  const [peers, setPeers] = useState({});
  const [spotlightedPeerId, setSpotlightedPeerId] = useState(null);

  const myVideoRef = useRef();
  const socketRef = useRef();
  const peerRef = useRef();
  const streamRef = useRef();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const roleFromURL = query.get("role") || "student";
    const nameFromURL = query.get("name") || "Guest";
    setRole(roleFromURL);
    setName(nameFromURL);
    console.log("Joining as:", roleFromURL, nameFromURL);

    socketRef.current = io(SOCKET_SERVER_URL);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        if (myVideoRef.current) myVideoRef.current.srcObject = stream;

        peerRef.current = new Peer(userId, {
          host: PEER_SERVER_HOST,
          port: PEER_SERVER_PORT,
          path: "/",
        });

        peerRef.current.on("open", () => {
          console.log("📡 Emitting join-session:", {
            meetingId,
            userId,
            role: roleFromURL,
          });

          socketRef.current.emit("join-session", {
            meetingId,
            userId,
            peerId: peerRef.current.id,
            role: roleFromURL,
          });
        });

        peerRef.current.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            setPeers((prev) => ({
              ...prev,
              [call.peer]: { stream: remoteStream, role: "student" },
            }));
          });
        });

        socketRef.current.on(
          "user-joined",
          ({ userId: newUserId, peerId: newPeerId, role: newRole }) => {
            console.log("🧠 New User Joined:", {
              newUserId,
              newPeerId,
              newRole,
            });
            if (newPeerId === peerRef.current.id) return;

            const call = peerRef.current.call(newPeerId, stream);
            call.on("stream", (remoteStream) => {
              setPeers((prev) => ({
                ...prev,
                [newPeerId]: { stream: remoteStream, role: newRole },
              }));

              if (roleFromURL === "educator" && newRole === "student") {
                setStudentsList((prev) =>
                  prev.includes(newUserId) ? prev : [...prev, newUserId]
                );
              }
            });
          }
        );

        socketRef.current.on(
          "user-left",
          ({ peerId: leftPeerId, userId: leftUserId }) => {
            setPeers((prev) => {
              const newPeers = { ...prev };
              delete newPeers[leftPeerId];
              return newPeers;
            });

            if (roleFromURL === "educator") {
              setStudentsList((prev) => prev.filter((id) => id !== leftUserId));
            }

            if (leftPeerId === spotlightedPeerId) {
              setSpotlightedPeerId(null);
            }
          }
        );

        socketRef.current.on("hand-raised", ({ studentId }) => {
          if (roleFromURL === "educator") {
            alert(`Student ${studentId} raised their hand ✋`);
          }
        });

        socketRef.current.on("spotlight-student", ({ peerId }) => {
          setSpotlightedPeerId(peerId);
        });
      });

    return () => {
      socketRef.current?.disconnect();
      peerRef.current?.destroy();
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [meetingId, userId]);

  const raiseHand = () => {
    socketRef.current.emit("raise-hand", { userId, name });
  };

  const spotlightStudent = (peerId) => {
    if (role === "educator") {
      socketRef.current.emit("spotlight-student", { peerId });
    }
  };

  const Video = ({ stream, peerId, spotlighted }) => {
    const ref = useRef();
    useEffect(() => {
      if (ref.current) ref.current.srcObject = stream;
    }, [stream]);
    return (
      <video
        ref={ref}
        playsInline
        autoPlay
        className={`rounded-md ${
          spotlighted ? "w-96 border-4 border-yellow-500" : "w-64"
        } cursor-pointer`}
        onClick={() => spotlightStudent(peerId)}
      />
    );
  };

  const peerEntries = Object.entries(peers);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">Meeting Room: {meetingId}</h2>
      <p className="mb-4">
        Welcome, {name} ({role})
      </p>

      <div>
        <video
          ref={myVideoRef}
          muted
          autoPlay
          playsInline
          className="w-64 rounded-md border-2 border-blue-500"
        />
      </div>

      {spotlightedPeerId && peers[spotlightedPeerId]?.stream && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-yellow-500">
            🎯 Spotlighted Student
          </h3>
          <Video
            stream={peers[spotlightedPeerId].stream}
            peerId={spotlightedPeerId}
            spotlighted
          />
        </div>
      )}

      <div className="flex flex-wrap gap-4 mt-6">
        {peerEntries
          .filter(([peerId]) => peerId !== spotlightedPeerId)
          .map(([peerId, data]) => (
            <Video
              key={peerId}
              stream={data.stream}
              peerId={peerId}
              spotlighted={false}
            />
          ))}
      </div>

      {role === "educator" && (
        <div className="mt-6">
          {console.log(studentsList)}
          <h3 className="text-lg font-semibold">👨‍🎓 Students Joined</h3>
          <ul className="list-disc ml-6">
            {studentsList.length > 0 ? (
              studentsList.map((sid) => <li key={sid}>{sid}</li>)
            ) : (
              <li>No students joined yet</li>
            )}
          </ul>
        </div>
      )}

      {role === "student" && (
        <button
          onClick={raiseHand}
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          ✋ Raise Hand
        </button>
      )}
    </div>
  );
};

export default MeetingRoom;
