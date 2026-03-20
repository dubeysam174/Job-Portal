import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setConversations,
  setCurrentConversation,
  setMessages,
  clearUnread
} from "../../redux/messageSlice.js";
import { useSocket } from "@/Context/SocketContext.jsx";


export default function ConversationList() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { conversations, currentConversation, unreadCounts } = useSelector((state) => state.message);
  const { onlineUsers, socket } = useSocket(); // ← add socket here

  useEffect(() => {
    dispatch(setConversations([]));

    axios.get("/api/v1/conversation", {
      withCredentials: true
    }).then((res) => {
      if (res.data.success) {
        dispatch(setConversations(res.data.conversations));
      }
    }).catch((err) => {});
  }, [user?._id]);

  // ✅ Refresh conversations when new message arrives
  useEffect(() => {
    if (!socket) return;

    socket.on("new_message", (msg) => {
      axios.get("/api/v1/conversation", { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            dispatch(setConversations(res.data.conversations));
          }
        });
    });

    return () => {
      socket.off("new_message");
    };
  }, [socket]);

  const openConversation = async (conversation) => {
    dispatch(setCurrentConversation(conversation));
    dispatch(clearUnread(conversation._id));

    const res = await axios.get(
      `/api/v1/message/${conversation._id}`,
      { withCredentials: true }
    );
    if (res.data.success) dispatch(setMessages(res.data.messages));

    await axios.put(
      `/api/v1/message/seen/${conversation._id}`,
      {},
      { withCredentials: true }
    );
  };

  const getOtherParticipant = (conversation) => {
    return conversation.participants.find((p) => {
      const participantId = p._id || p;
      return participantId.toString() !== user._id.toString();
    });
  };

  return (
    <div className="w-80 border-r h-screen overflow-y-auto dark:bg-gray-900">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Messages</h2>
      </div>

      {conversations.length === 0 && (
        <p className="text-sm text-gray-500 p-4">No conversations yet.</p>
      )}

      {conversations.map((conv) => {
        const other = getOtherParticipant(conv);
        const isOnline = onlineUsers.includes(other?._id);
        const unread = unreadCounts[conv._id] || 0;
        const isActive = currentConversation?._id === conv._id;

        return (
          <div
            key={conv._id}
            onClick={() => openConversation(conv)}
            className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 hover:dark:bg-gray-500
              ${isActive ? "bg-blue-50 dark:bg-gray-600 hover:dark:bg-gray-600 border-l-4 border-blue-500" : ""}`}
          >
            <div className="relative">
              <img
                src={other?.profile?.profilePhoto || "/default-avatar.png"}
                className="w-10 h-10 rounded-full object-cover"
              />
              {isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">
                {other?.fullname || "Unknown User"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {conv.lastMessage?.text || "Start a conversation"}
              </p>
            </div>

            {unread > 0 && (
              <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unread}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}