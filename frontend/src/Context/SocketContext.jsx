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
    if (!user?._id) {
      if (socket) {
        socket.close();
        setSocket(null);
        setOnlineUsers([]);
      }
      return;
    }

    const s = io("https://jobx-6vou.onrender.com", {
  auth: { userId: user._id },   // ← use auth instead of query
  withCredentials: true,
  transports: ["websocket"]
});
    s.on("connect", () => {
    
    });

    s.on("online_users", (users) => {
      setOnlineUsers(users);
    });

    s.on("disconnect", () => {
      
    });

    s.on("connect_error", (err) => {
      console.log("Socket connection error:", err.message);
    });

    setSocket(s);

    return () => {
    if (s.connected) {
      s.disconnect();  
    } else {
      s.close();        
    }
  };
  }, [user?._id]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};