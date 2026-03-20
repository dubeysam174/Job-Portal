// src/context/SocketContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const SocketContext = createContext({ socket: null, onlineUsers: [] });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // If no user, clean up any existing socket
    if (!user?._id) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setOnlineUsers([]);
      }
      return;
    }

    // ✅ Don't recreate if already connected with same user
    if (socket?.connected) return;

    const s = io("https://jobx-ohzk.onrender.com", {
      auth: { userId: user._id },
      withCredentials: true,
      transports: ["websocket"],
      reconnectionAttempts: 5,   // ✅ stop after 5 tries
      reconnectionDelay: 2000,   // ✅ wait 2s between retries
    });

    s.on("connect", () => {
      console.log("✅ Socket connected:", s.id);
    });

    s.on("online_users", (users) => {
      setOnlineUsers(users);
    });

    s.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
    });

    s.on("connect_error", (err) => {
      console.log("Socket connection error:", err.message);
    });

    setSocket(s);

    // ✅ Cleanup on unmount or user change
    return () => {
      s.disconnect();
    };
  }, [user?._id]); // only re-run when user ID changes

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};