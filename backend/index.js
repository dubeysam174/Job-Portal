import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import messageRoute from "./routes/message.route.js";
import conversationRoute from "./routes/conversation.route.js";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const httpServer = createServer(app);
const _dirname = path.resolve();
const onlineUsers = new Map();


const allowedOrigins = [
  "http://localhost:8000", 
  "http://localhost:5173",
  "http://localhost:5174",
  "https://jobx-ohzk.onrender.com"
];

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
});

io.on("connection", (socket) => {
  const userId = socket.handshake.auth.userId;

  if (userId) {
    onlineUsers.set(userId, socket.id);
    io.emit("online_users", Array.from(onlineUsers.keys()));
    console.log(`User connected: ${userId} | Socket: ${socket.id}`);
  }

  socket.on("send_message", async ({ conversationId, receiverId, text }) => {
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("new_message", {
        conversationId,
        text,
        sender: userId,
        createdAt: new Date()
      });
    }
  });

  socket.on("typing", ({ conversationId, receiverId }) => {
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing", { conversationId, senderId: userId });
    }
  });

  socket.on("stop_typing", ({ conversationId, receiverId }) => {
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("stop_typing", { conversationId });
    }
  });

  socket.on("disconnect", () => {
    if (userId) {
      onlineUsers.delete(userId);
      io.emit("online_users", Array.from(onlineUsers.keys()));
      console.log(`User disconnected: ${userId}`);
    }
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ FIX 3: Frontend origins (not localhost:8000)
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/conversation", conversationRoute);

app.use(express.static(path.join(_dirname, "frontend/dist")));

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(_dirname, "frontend/dist/index.html"));
});

const PORT = process.env.PORT || 8000;

connectDB();
httpServer.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export { io, onlineUsers };
    