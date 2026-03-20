import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addMessage, updateLastMessage } from "../../redux/messageSlice.js";
import { useSocket } from "@/Context/SocketContext.jsx";

export default function ChatWindow() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { currentConversation, messages } = useSelector((state) => state.message);
  const { socket } = useSocket();

  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef();
  const typingTimeout = useRef();

  // Listen for incoming messages via socket
  useEffect(() => {
    if (!socket) return;

    socket.on("new_message", (msg) => {
      if (msg.conversationId === currentConversation?._id) {
        dispatch(addMessage(msg));
      }
      dispatch(updateLastMessage({
        conversationId: msg.conversationId,
        message: msg
      }));
    });

    socket.on("typing", ({ conversationId }) => {
      if (conversationId === currentConversation?._id) setIsTyping(true);
    });

    socket.on("stop_typing", ({ conversationId }) => {
      if (conversationId === currentConversation?._id) setIsTyping(false);
    });

    return () => {
      socket.off("new_message");
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, [socket, currentConversation]);

  // Auto scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getOtherParticipant = () => {
    return currentConversation?.participants?.find((p) => p._id !== user._id);
  };

  const handleTyping = () => {
    const other = getOtherParticipant();
    if (!other) return;

    socket?.emit("typing", {
      conversationId: currentConversation._id,
      receiverId: other._id
    });

    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket?.emit("stop_typing", {
        conversationId: currentConversation._id,
        receiverId: other._id
      });
    }, 1500);
  };

  const sendMessage = async () => {
    if (!text.trim() || !currentConversation) return;

    const other = getOtherParticipant();

    try {
      const res = await axios.post(
        "/api/v1/message/send",
        {
          conversationId: currentConversation._id,
          receiverId: other._id,
          text: text.trim()
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(addMessage(res.data.message));
        dispatch(updateLastMessage({
          conversationId: currentConversation._id,
          message: res.data.message
        }));
        setText("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!currentConversation) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <p>Select a conversation to start chatting</p>
      </div>
    );
  }

  const other = getOtherParticipant();

  return (
    <div className="flex-1 flex flex-col h-screen dark:bg-black">

      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <img
          src={other?.profile?.profilePhoto || "/default-avatar.png"}
          className="w-9 h-9 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-sm">{other?.fullname}</p>
          <p className="text-xs text-gray-500 capitalize">{other?.role}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => {
          const isMine = msg.sender?._id === user._id || msg.sender === user._id;
          return (
            <div key={i} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm
                ${isMine
                  ? "bg-blue-500 text-white rounded-br-sm"
                  : "bg-gray-100 text-gray-800 rounded-bl-sm"
                }`}>
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${isMine ? "text-blue-100" : "text-gray-400"}`}>
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit", minute: "2-digit"
                  })}
                </p>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-sm">
              <span className="text-sm text-gray-500">typing...</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 p-4 border-t">
        <input
          value={text}
          onChange={(e) => { setText(e.target.value); handleTyping(); }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:border-blue-400 dark:text-gray-50"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}