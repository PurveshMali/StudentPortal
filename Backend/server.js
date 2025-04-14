require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const learnerRoutes = require("./routes/learner");
const educatorRoutes = require("./routes/educatorRoutes");
const { authenticate, authorize } = require("./middleware/authMiddleware");
const path = require("path");
const rewardRoutes = require("./routes/reward");
const postRoutes = require("./routes/post");
const replyRoutes = require("./routes/replies");
const leaderboardRoutes = require("./routes/leaderboard");
const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/courseRoutes");
const forumRoutes = require("./routes/forumRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const socketIo = require("socket.io");
const cron = require("node-cron");
const http = require("http");

const app = express();
const server = http.createServer(app);
// Middleware
app.use(express.json());
app.use(cookieParser());

const io = socketIo(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Allows cookies to be sent
  })
);
// You can configure this as per your requirements

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/learner", learnerRoutes);
app.use("/api/educator", educatorRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/posts", postRoutes);
app.use("/api/replies", replyRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/session", sessionRoutes);

// Protected route example
app.get("/api/educator", authenticate, authorize(["educator"]), (req, res) => {
  res.send("Welcome, Educator! You have access to this route.");
});

app.get("/api/learner", authenticate, authorize(["learner"]), (req, res) => {
  res.send("Welcome, Learner! You have access to this route.");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully ✅"))
  .catch((err) => console.log("MongoDB connection error:", err));

const sessionUsers = {};

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join-session", ({ meetingId, userId, peerId, role }) => {
    if (!sessionUsers[meetingId]) sessionUsers[meetingId] = [];
    console.log("🔌 User joined:", { userId, role, peerId: socket.id });

    // Check for max participants
    if (sessionUsers[meetingId].length >= 10) {
      socket.emit("room-full", { message: "Room is full." });
      return;
    }

    // Prevent duplicate socket entries
    const alreadyJoined = sessionUsers[meetingId].some(
      (user) => user.userId === userId
    );
    if (!alreadyJoined) {
      sessionUsers[meetingId].push({ socketId: socket.id, userId });
    }

    socket.join(meetingId);
    console.log(`User ${userId} joined meeting ${meetingId}`);

    // 🔥 Emit user-joined for WebRTC peer connection
    socket.to(meetingId).emit("user-joined", {
      userId,
      peerId, // This should come from frontend (peerRef.current.id)
      role,
    });

    // Send updated participant list
    io.to(meetingId).emit("participants", {
      participants: sessionUsers[meetingId],
    });

    // WebRTC signal forwarding
    socket.on("signal", (data) => {
      io.to(data.to).emit("signal", {
        from: socket.id,
        signal: data.signal,
      });
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      if (sessionUsers[meetingId]) {
        sessionUsers[meetingId] = sessionUsers[meetingId].filter(
          (u) => u.socketId !== socket.id
        );

        io.to(meetingId).emit("participants-update", {
          participants: sessionUsers[meetingId],
        });

        socket.to(meetingId).emit("user-left", { socketId: socket.id });
      }

      console.log("Socket disconnected:", socket.id);
    });
  });
});

cron.schedule("* * * * *", async () => {
  const now = new Date();
  const Session = require("./models/Session");
  try {
    // Mark sessions as live if the scheduled time is now (or within a buffer window)
    await Session.updateMany(
      { scheduledAt: { $lte: now }, status: "upcoming" },
      { $set: { status: "live" } }
    );
    // Mark sessions as finished if scheduled time has passed by, say, 1 hour
    await Session.updateMany(
      {
        scheduledAt: { $lte: new Date(now.getTime() - 60 * 60 * 1000) },
        status: "live",
      },
      { $set: { status: "finished" } }
    );
    console.log("Cron job updated session statuses");
  } catch (error) {
    console.error("Error during cron job:", error);
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀Server running on port ${PORT}`));
