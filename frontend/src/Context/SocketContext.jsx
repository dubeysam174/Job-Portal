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

    const s = io("", {
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

    s.on("application_status", ({ jobTitle, companyName, status }) => {
      console.log("🔔 Application status received:", { jobTitle, status });

      if (status === "accepted") {
        toast.success(`🎉 Congratulations! Your application for ${jobTitle} at ${companyName} has been Accepted!`, {
          duration: 6000,  // show for 6 seconds
        });
      } else if (status === "rejected") {
        toast.error(`😔 Your application for ${jobTitle} at ${companyName} was not selected.`, {
          duration: 6000,
        });
      }
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