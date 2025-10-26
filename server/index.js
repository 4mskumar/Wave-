import express from "express";
import cors from "cors";
import http from "http";
import { config } from "dotenv";
import { connectDb } from "./utils/db.js";
import { router as postRouter } from "./routes/posts.route.js";
import { router as userRouter } from "./routes/user.route.js";
// import { router } from "./routes/messages.route.js";
import { Server } from "socket.io";
import router from "./routes/messages.route.js";

config();

const app = express();
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

// ✅ CORS setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Socket.io setup
export const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});

export const userSocketMap = new Map(); // userId -> socketId

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap.set(userId, socket.id);
    console.log("✅ User connected:", userId);
  }

  // Broadcast online users
  io.emit("onlineUsers", Array.from(userSocketMap.keys()));
  console.log("Online Users:", Array.from(userSocketMap.keys()));

  socket.on("disconnect", () => {
    if (userId) userSocketMap.delete(userId);
    io.emit("onlineUsers", Array.from(userSocketMap.keys()));
    console.log("❌ User disconnected:", userId);
  });
});

// ✅ Routes
app.use("/api/post", postRouter);
app.use("/api", userRouter);
app.use("/api/messages", router);

// ✅ Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  connectDb();
});
