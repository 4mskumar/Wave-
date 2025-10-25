import express from "express";
import cors from "cors";
import http from "http";
import { config } from "dotenv";
import { connectDb } from "./utils/db.js";
import { router as postRouter } from "./routes/posts.route.js";
import { router as userRouter } from "./routes/user.route.js";
import { Server } from "socket.io";
import router from "./routes/messages.route.js";


config();

const app = express();
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

// ✅ FIX: Enable CORS here
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true, // allow cookies/auth if needed
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Socket.io setup
export const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});

export const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;
  console.log("User connected:", userId);
  console.log('user-socket-map', userSocketMap);

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    console.log("User disconnected:", userId);
  });
  
});

// Routes
app.use("/api/post", postRouter);
app.use("/api", userRouter);
app.use("/api", router)

server.listen(PORT, () => {
  console.log(`Server is live at ${PORT}`);
  connectDb();
});
